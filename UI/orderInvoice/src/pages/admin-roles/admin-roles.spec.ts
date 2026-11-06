import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, of } from 'rxjs';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { vi } from 'vitest';
import { AdminRoles } from './admin-roles';
import { AdminRole } from '../../model/admin/admin-role';
import { AdminRolesService } from '../../services/admin-roles-service';
import { NotificationService } from '../../utils/notification-service';

type Internals = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

describe('AdminRoles', () => {
  let fixture: ComponentFixture<AdminRoles>;
  let confirmation: ConfirmationService;
  let confirmed: Confirmation | undefined;
  let list: ReturnType<typeof vi.fn>;
  let create: ReturnType<typeof vi.fn>;
  let remove: ReturnType<typeof vi.fn>;
  let toast: Record<'success' | 'info' | 'warn' | 'error', ReturnType<typeof vi.fn>>;

  const admin: AdminRole = { name: 'Admin', isBuiltIn: true, userCount: 1 };
  const basic: AdminRole = { name: 'User', isBuiltIn: true, userCount: 0 };
  const manager: AdminRole = { name: 'Manager', isBuiltIn: false, userCount: 3 };
  const auditor: AdminRole = { name: 'Auditor', isBuiltIn: false, userCount: 0 };

  const internals = () => fixture.componentInstance as unknown as Internals;
  const html = () => fixture.nativeElement as HTMLElement;
  const rowsInDom = () => Array.from(html().querySelectorAll<HTMLElement>('tr.roleRow'));
  const rowFor = (name: string) => rowsInDom().find(r => r.querySelector('.roleName')?.textContent?.includes(name))!;
  const settle = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise(resolve => setTimeout(resolve, 0));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    confirmed = undefined;
    list = vi.fn().mockReturnValue(of([admin, auditor, manager, basic]));
    create = vi.fn().mockReturnValue(of({ name: 'Reviewer', isBuiltIn: false, userCount: 0 }));
    remove = vi.fn().mockReturnValue(of(true));
    toast = { success: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AdminRoles],
      providers: [
        { provide: AdminRolesService, useValue: { list, create, delete: remove } },
        { provide: NotificationService, useValue: toast },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminRoles);
    confirmation = fixture.debugElement.injector.get(ConfirmationService);
    vi.spyOn(confirmation, 'confirm').mockImplementation((c: Confirmation) => { confirmed = c; return confirmation; });
    await settle();
  });

  describe('the list', () => {
    it('should create', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should load the roles when it opens', () => {
      expect(list).toHaveBeenCalledTimes(1);
    });

    it('should show every role with how many users have it', () => {
      expect(rowsInDom().length).toBe(4);
      expect(rowFor('Manager').querySelector('.roleUsers')?.textContent).toContain('3');
      expect(rowFor('Auditor').querySelector('.roleUsers')?.textContent).toContain('0');
    });

    it('should mark the built-in roles', () => {
      expect(rowFor('Admin').textContent).toContain('Built in');
      expect(rowFor('User').textContent).toContain('Built in');
      expect(rowFor('Manager').textContent).not.toContain('Built in');
    });

    it('should say so when there are no roles', async () => {
      list.mockReturnValue(of([]));
      fixture = TestBed.createComponent(AdminRoles);
      await settle();

      expect(html().textContent).toContain('No roles.');
    });

    it('should stop showing it is loading once the list has arrived', () => {
      expect(internals()['loading']()).toBe(false);
    });
  });

  describe('adding a role', () => {
    it('should not allow adding while the name is blank', () => {
      expect(internals()['canAdd']()).toBe(false);
      internals()['newRole'].set('   ');
      expect(internals()['canAdd']()).toBe(false);
      expect(html().querySelector<HTMLButtonElement>('#addRole')!.disabled).toBe(true);
    });

    it('should allow adding once there is a name', async () => {
      internals()['newRole'].set('Reviewer');
      await settle();

      expect(internals()['canAdd']()).toBe(true);
      expect(html().querySelector<HTMLButtonElement>('#addRole')!.disabled).toBe(false);
    });

    it('should send the trimmed name', () => {
      internals()['newRole'].set('  Reviewer ');

      internals()['add']();

      expect(create).toHaveBeenCalledWith('Reviewer');
    });

    it('should say so, clear the box and show the list again when it worked', () => {
      internals()['newRole'].set('Reviewer');
      list.mockClear();

      internals()['add']();

      expect(toast.success).toHaveBeenCalledWith('Role added', 'Reviewer');
      expect(internals()['newRole']()).toBe('');
      expect(list).toHaveBeenCalledTimes(1);
    });

    it('should keep what was typed when the server refuses it (a duplicate, a bad name)', () => {
      create.mockReturnValue(of(null));
      internals()['newRole'].set('Admin');
      list.mockClear();

      internals()['add']();

      expect(internals()['newRole']()).toBe('Admin');
      expect(toast.success).not.toHaveBeenCalled();
      expect(list).not.toHaveBeenCalled();
    });

    it('should add when Enter is pressed in the box', async () => {
      const input = html().querySelector<HTMLInputElement>('#newRoleName')!;
      input.value = 'Reviewer';
      input.dispatchEvent(new Event('input'));
      await settle();

      input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));

      expect(create).toHaveBeenCalledWith('Reviewer');
    });

    it('should not add twice while the first is in progress', () => {
      const pending = new Subject<AdminRole | null>();
      create.mockReturnValue(pending);
      internals()['newRole'].set('Reviewer');

      internals()['add']();
      internals()['add']();

      expect(create).toHaveBeenCalledTimes(1);
      pending.next(null);
      pending.complete();
      expect(internals()['adding']()).toBe(false);
    });

    it('should do nothing when there is no name', () => {
      internals()['add']();

      expect(create).not.toHaveBeenCalled();
    });
  });

  describe('deleting a role', () => {
    it('should only allow deleting a role that is not built in and that nobody has', () => {
      expect(internals()['canDelete'](auditor)).toBe(true);
      expect(internals()['canDelete'](admin)).toBe(false);
      expect(internals()['canDelete'](basic)).toBe(false);
      expect(internals()['canDelete'](manager)).toBe(false);
    });

    it('should show that on the buttons', () => {
      expect(rowFor('Auditor').querySelector<HTMLButtonElement>('.deleteRole')!.disabled).toBe(false);
      expect(rowFor('Admin').querySelector<HTMLButtonElement>('.deleteRole')!.disabled).toBe(true);
      expect(rowFor('Manager').querySelector<HTMLButtonElement>('.deleteRole')!.disabled).toBe(true);
    });

    it('should explain why a role cannot be deleted', () => {
      expect(internals()['whyNotDeletable'](admin)).toContain('Built in');
      expect(internals()['whyNotDeletable'](manager)).toContain('Still given to users');
      expect(internals()['whyNotDeletable'](auditor)).toBe('');
      expect(rowFor('Manager').querySelector('.deleteRole')?.getAttribute('title')).toContain('Still given to users');
    });

    it('should ask first, naming the role', () => {
      internals()['remove'](auditor);

      expect(confirmed?.header).toBe('Delete role');
      expect(confirmed?.message).toContain('Auditor');
      expect(remove).not.toHaveBeenCalled();
    });

    it('should delete once confirmed, say so, and refresh the list', () => {
      internals()['remove'](auditor);
      list.mockClear();

      confirmed!.accept!();

      expect(remove).toHaveBeenCalledWith('Auditor');
      expect(toast.success).toHaveBeenCalledWith('Role deleted', 'Auditor');
      expect(list).toHaveBeenCalledTimes(1);
    });

    it('should not even ask about a role that cannot be deleted', () => {
      internals()['remove'](admin);
      internals()['remove'](manager);

      expect(confirmed).toBeUndefined();
      expect(remove).not.toHaveBeenCalled();
    });

    it('should keep the list as it is when the server refuses', () => {
      remove.mockReturnValue(of(false));
      internals()['remove'](auditor);
      list.mockClear();

      confirmed!.accept!();

      expect(toast.success).not.toHaveBeenCalled();
      expect(list).not.toHaveBeenCalled();
    });
  });
});
