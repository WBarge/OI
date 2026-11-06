import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, of } from 'rxjs';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { vi } from 'vitest';
import { AdminGroups } from './admin-groups';
import { AdminGroup, AdminGroupDetail } from '../../model/admin/admin-group';
import { AdminGroupsService } from '../../services/admin-groups-service';
import { NotificationService } from '../../utils/notification-service';

type Internals = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

describe('AdminGroups', () => {
  let fixture: ComponentFixture<AdminGroups>;
  let confirmation: ConfirmationService;
  let confirmed: Confirmation | undefined;
  let list: ReturnType<typeof vi.fn>;
  let get: ReturnType<typeof vi.fn>;
  let create: ReturnType<typeof vi.fn>;
  let update: ReturnType<typeof vi.fn>;
  let remove: ReturnType<typeof vi.fn>;
  let toast: Record<'success' | 'info' | 'warn' | 'error', ReturnType<typeof vi.fn>>;

  const sales: AdminGroup = { name: 'sales', description: 'The sales team', memberCount: 2 };
  const ops: AdminGroup = { name: 'ops', description: null, memberCount: 0 };
  const salesDetail: AdminGroupDetail = {
    name: 'sales', description: 'The sales team',
    members: [{ userId: 'u1', email: 'amy@example.com', displayName: 'Amy First' }, { userId: 'u2', email: 'zed@example.com', displayName: 'Zed Last' }]
  };

  const internals = () => fixture.componentInstance as unknown as Internals;
  const html = () => fixture.nativeElement as HTMLElement;
  const rowsInDom = () => Array.from(html().querySelectorAll<HTMLElement>('tr.groupRow'));
  const rowFor = (name: string) => rowsInDom().find(r => r.querySelector('.groupName')?.textContent?.includes(name))!;
  const settle = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise(resolve => setTimeout(resolve, 0));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    confirmed = undefined;
    list = vi.fn().mockReturnValue(of([ops, sales]));
    get = vi.fn().mockReturnValue(of(salesDetail));
    create = vi.fn().mockReturnValue(of({ name: 'finance', description: null, memberCount: 0 }));
    update = vi.fn().mockReturnValue(of(sales));
    remove = vi.fn().mockReturnValue(of(true));
    toast = { success: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AdminGroups],
      providers: [
        { provide: AdminGroupsService, useValue: { list, get, create, update, delete: remove } },
        { provide: NotificationService, useValue: toast },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminGroups);
    confirmation = fixture.debugElement.injector.get(ConfirmationService);
    vi.spyOn(confirmation, 'confirm').mockImplementation((c: Confirmation) => { confirmed = c; return confirmation; });
    await settle();
  });

  describe('the list', () => {
    it('should create', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should load the groups when it opens', () => {
      expect(list).toHaveBeenCalledTimes(1);
    });

    it('should show each group with its description and member count', () => {
      expect(rowsInDom().length).toBe(2);
      expect(rowFor('sales').querySelector('.groupDescription')?.textContent).toContain('The sales team');
      expect(rowFor('sales').querySelector('.groupMembers')?.textContent).toContain('2');
      expect(rowFor('ops').querySelector('.groupMembers')?.textContent).toContain('0');
    });

    it('should say so when there are no groups', async () => {
      list.mockReturnValue(of([]));
      fixture = TestBed.createComponent(AdminGroups);
      await settle();

      expect(html().textContent).toContain('No groups.');
    });
  });

  describe('creating a group', () => {
    it('should open an empty form', () => {
      internals()['name'].set('left over');

      internals()['openNew']();

      expect(internals()['dialogVisible']()).toBe(true);
      expect(internals()['isNew']()).toBe(true);
      expect(internals()['name']()).toBe('');
      expect(internals()['description']()).toBe('');
      expect(internals()['members']()).toEqual([]);
    });

    it('should open from the New group button', async () => {
      html().querySelector<HTMLButtonElement>('#newGroup')!.click();
      await settle();

      expect(internals()['dialogVisible']()).toBe(true);
    });

    it('should not allow saving without a name', () => {
      internals()['openNew']();
      expect(internals()['canSave']()).toBe(false);

      internals()['name'].set('   ');
      expect(internals()['canSave']()).toBe(false);

      internals()['name'].set('finance');
      expect(internals()['canSave']()).toBe(true);
    });

    it('should send the name in lower case, trimmed, with the description', () => {
      internals()['openNew']();
      internals()['name'].set('  Finance-Team ');
      internals()['description'].set('  Money people ');

      internals()['save']();

      expect(create).toHaveBeenCalledWith('finance-team', 'Money people');
    });

    it('should send no description when it was left blank', () => {
      internals()['openNew']();
      internals()['name'].set('finance');
      internals()['description'].set('   ');

      internals()['save']();

      expect(create).toHaveBeenCalledWith('finance', null);
    });

    it('should close, say so and refresh the list when it worked', () => {
      internals()['openNew']();
      internals()['name'].set('finance');
      list.mockClear();

      internals()['save']();

      expect(internals()['dialogVisible']()).toBe(false);
      expect(toast.success).toHaveBeenCalledWith('Group created', 'finance');
      expect(list).toHaveBeenCalledTimes(1);
    });

    it('should stay open when the server refuses it (a duplicate, a bad name)', () => {
      create.mockReturnValue(of(null));
      internals()['openNew']();
      internals()['name'].set('sales');

      internals()['save']();

      expect(internals()['dialogVisible']()).toBe(true);
      expect(toast.success).not.toHaveBeenCalled();
    });

    it('should not save twice while the first save is in progress', () => {
      const pending = new Subject<AdminGroup | null>();
      create.mockReturnValue(pending);
      internals()['openNew']();
      internals()['name'].set('finance');

      internals()['save']();
      internals()['save']();

      expect(create).toHaveBeenCalledTimes(1);
      pending.next(null);
      pending.complete();
      expect(internals()['saving']()).toBe(false);
    });

    it('should do nothing when the form is not valid', () => {
      internals()['openNew']();

      internals()['save']();

      expect(create).not.toHaveBeenCalled();
    });
  });

  describe('editing a group', () => {
    it('should fill the form from the group, and look up who is in it', () => {
      internals()['openEdit'](sales);

      expect(internals()['isNew']()).toBe(false);
      expect(internals()['name']()).toBe('sales');
      expect(internals()['description']()).toBe('The sales team');
      expect(get).toHaveBeenCalledWith('sales');
      expect(internals()['members']()).toEqual(salesDetail.members);
    });

    it('should open from the Edit button on a row', async () => {
      rowFor('sales').querySelector<HTMLButtonElement>('.editGroup')!.click();
      await settle();

      expect(internals()['editing']()?.name).toBe('sales');
    });

    it('should show an empty description as an empty box', () => {
      internals()['openEdit'](ops);

      expect(internals()['description']()).toBe('');
    });

    it('should allow saving without touching the name, which cannot change', () => {
      internals()['openEdit'](sales);

      expect(internals()['canSave']()).toBe(true);
    });

    it('should send only the new description, for the group that was opened', () => {
      internals()['openEdit'](sales);
      internals()['description'].set('  New text ');
      internals()['name'].set('tampered');   // the name box is read only, but even so the name must not change

      internals()['save']();

      expect(update).toHaveBeenCalledWith('sales', 'New text');
      expect(create).not.toHaveBeenCalled();
    });

    it('should clear the description when the box is emptied', () => {
      internals()['openEdit'](sales);
      internals()['description'].set('');

      internals()['save']();

      expect(update).toHaveBeenCalledWith('sales', null);
    });

    it('should close, say so and refresh the list when it worked', () => {
      internals()['openEdit'](sales);
      list.mockClear();

      internals()['save']();

      expect(internals()['dialogVisible']()).toBe(false);
      expect(toast.success).toHaveBeenCalledWith('Group saved', 'sales');
      expect(list).toHaveBeenCalledTimes(1);
    });

    it('should show no members when they cannot be loaded', () => {
      get.mockReturnValue(of(null));

      internals()['openEdit'](sales);

      expect(internals()['members']()).toEqual([]);
    });

    it('should not show one group’s members under another when the answer arrives late', () => {
      const late = new Subject<AdminGroupDetail | null>();
      get.mockReturnValueOnce(late);
      internals()['openEdit'](sales);
      get.mockReturnValueOnce(of({ name: 'ops', description: null, members: [] }));
      internals()['openEdit'](ops);

      late.next(salesDetail);
      late.complete();

      expect(internals()['members']()).toEqual([]);
    });

    it('should forget the members of the last group when a new group is started', () => {
      internals()['openEdit'](sales);
      internals()['openNew']();

      expect(internals()['members']()).toEqual([]);
    });
  });

  describe('deleting a group', () => {
    it('should ask first, saying how many users it affects', () => {
      internals()['remove'](sales);

      expect(confirmed?.header).toBe('Delete group');
      expect(confirmed?.message).toContain('sales');
      expect(confirmed?.message).toContain('2 user(s)');
      expect(remove).not.toHaveBeenCalled();
    });

    it('should say when nobody is in the group', () => {
      internals()['remove'](ops);

      expect(confirmed?.message).toContain('Nobody is in it.');
    });

    it('should delete once confirmed, say so, and refresh the list', () => {
      internals()['remove'](sales);
      list.mockClear();

      confirmed!.accept!();

      expect(remove).toHaveBeenCalledWith('sales');
      expect(toast.success).toHaveBeenCalledWith('Group deleted', 'sales');
      expect(list).toHaveBeenCalledTimes(1);
    });

    it('should keep the list as it is when the server refuses', () => {
      remove.mockReturnValue(of(false));
      internals()['remove'](sales);
      list.mockClear();

      confirmed!.accept!();

      expect(toast.success).not.toHaveBeenCalled();
      expect(list).not.toHaveBeenCalled();
    });

    it('should open the confirmation from the Delete button on a row', async () => {
      rowFor('ops').querySelector<HTMLButtonElement>('.deleteGroup')!.click();
      await settle();

      expect(confirmed?.header).toBe('Delete group');
    });
  });
});
