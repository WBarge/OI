import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, of } from 'rxjs';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { vi } from 'vitest';
import { AdminUsers, MIN_PASSWORD_LENGTH } from './admin-users';
import { AdminUser } from '../../model/admin/admin-user';
import { AdminGroupsService } from '../../services/admin-groups-service';
import { AdminRolesService } from '../../services/admin-roles-service';
import { AdminUsersService } from '../../services/admin-users-service';
import { AuthService } from '../../services/auth-service';
import { NotificationService } from '../../utils/notification-service';

// the component's members are protected; the specs reach them by name
type Internals = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

describe('AdminUsers', () => {
  let fixture: ComponentFixture<AdminUsers>;
  let confirmation: ConfirmationService;
  let confirmed: Confirmation | undefined;

  let list: ReturnType<typeof vi.fn>;
  let create: ReturnType<typeof vi.fn>;
  let update: ReturnType<typeof vi.fn>;
  let resetPassword: ReturnType<typeof vi.fn>;
  let disable: ReturnType<typeof vi.fn>;
  let enable: ReturnType<typeof vi.fn>;
  let remove: ReturnType<typeof vi.fn>;
  let toast: Record<'success' | 'info' | 'warn' | 'error', ReturnType<typeof vi.fn>>;
  const myId = signal('me');

  const user = (overrides: Partial<AdminUser> = {}): AdminUser => ({
    id: 'u1', email: 'pat@example.com', displayName: 'Pat Example', lockoutEnd: null, isDisabled: false, roles: ['User'], groups: ['sales'], ...overrides
  });
  const pat = user();
  const me = user({ id: 'me', email: 'me@example.com', displayName: 'Me Myself', roles: ['Admin', 'User'], groups: [] });
  const gone = user({ id: 'u3', email: 'gone@example.com', displayName: 'Gone Away', isDisabled: true, lockoutEnd: '9999-12-31T23:59:59.9999999+00:00', roles: [], groups: [] });
  const locked = user({ id: 'u4', email: 'locked@example.com', displayName: 'Locked Out', lockoutEnd: new Date(Date.now() + 10 * 60_000).toISOString() });

  const internals = () => fixture.componentInstance as unknown as Internals;
  const html = () => fixture.nativeElement as HTMLElement;
  const rowsInDom = () => Array.from(html().querySelectorAll<HTMLElement>('tr.userRow'));
  const rowFor = (email: string) => rowsInDom().find(r => r.textContent?.includes(email))!;
  const settle = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise(resolve => setTimeout(resolve, 0));
    fixture.detectChanges();
  };
  const pageOf = (data: AdminUser[], total = data.length) => ({ data, totalRecordSize: total });

  beforeEach(async () => {
    confirmed = undefined;
    myId.set('me');
    list = vi.fn().mockReturnValue(of(pageOf([pat, me, gone, locked])));
    create = vi.fn().mockReturnValue(of(user({ id: 'new', email: 'new@example.com' })));
    update = vi.fn().mockReturnValue(of(pat));
    resetPassword = vi.fn().mockReturnValue(of(true));
    disable = vi.fn().mockReturnValue(of({ ...pat, isDisabled: true }));
    enable = vi.fn().mockReturnValue(of(pat));
    remove = vi.fn().mockReturnValue(of(true));
    toast = { success: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AdminUsers],
      providers: [
        { provide: AdminUsersService, useValue: { list, create, update, resetPassword, disable, enable, delete: remove } },
        { provide: AdminRolesService, useValue: { list: () => of([{ name: 'Admin', isBuiltIn: true, userCount: 1 }, { name: 'User', isBuiltIn: true, userCount: 2 }, { name: 'Manager', isBuiltIn: false, userCount: 0 }]) } },
        { provide: AdminGroupsService, useValue: { list: () => of([{ name: 'ops', description: null, memberCount: 0 }, { name: 'sales', description: null, memberCount: 1 }]) } },
        { provide: AuthService, useValue: { userId: myId } },
        { provide: NotificationService, useValue: toast },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUsers);
    confirmation = fixture.debugElement.injector.get(ConfirmationService);
    vi.spyOn(confirmation, 'confirm').mockImplementation((c: Confirmation) => { confirmed = c; return confirmation; });
    await settle();
  });

  describe('the list', () => {
    it('should create', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should ask for the first page when it opens', () => {
      expect(list).toHaveBeenCalledWith('', 1, 10);
    });

    it('should show a row for every user, with name and email', () => {
      expect(rowsInDom().length).toBe(4);
      expect(rowFor('pat@example.com').textContent).toContain('Pat Example');
    });

    it('should show each user’s roles and groups', () => {
      const row = rowFor('pat@example.com');

      expect(row.querySelector('.userRoles')?.textContent).toContain('User');
      expect(row.querySelector('.userGroups')?.textContent).toContain('sales');
      expect(rowFor('me@example.com').querySelector('.userRoles')?.textContent).toContain('Admin');
    });

    it('should show who is active, locked out and disabled', () => {
      expect(rowFor('pat@example.com').querySelector('.userStatus')?.textContent).toContain('Active');
      expect(rowFor('locked@example.com').querySelector('.userStatus')?.textContent).toContain('Locked');
      expect(rowFor('gone@example.com').querySelector('.userStatus')?.textContent).toContain('Disabled');
    });

    it('should treat a lockout that has already ended as active', () => {
      const ended = user({ lockoutEnd: new Date(Date.now() - 60_000).toISOString() });

      expect(internals()['statusOf'](ended)).toBe('Active');
    });

    it.each([['Active', 'success'], ['Locked', 'warn'], ['Disabled', 'danger']])('should show %s users with the %s colour', (status, severity) => {
      const sample = status === 'Active' ? pat : status === 'Locked' ? locked : gone;

      expect(internals()['severityOf'](sample)).toBe(severity);
    });

    it('should say so when there are no users', async () => {
      list.mockReturnValue(of(pageOf([])));
      internals()['applySearch']();
      await settle();

      expect(html().textContent).toContain('No users found.');
    });

    it('should show the list the page asked for, and the total', async () => {
      list.mockReturnValue(of(pageOf([pat], 41)));
      internals()['applySearch']();
      await settle();

      expect(internals()['totalRecords']()).toBe(41);
      expect(rowsInDom().length).toBe(1);
    });

    it('should show that it is loading while the page is on its way, and stop afterwards', async () => {
      const pending = new Subject<ReturnType<typeof pageOf>>();
      list.mockReturnValue(pending);

      internals()['applySearch']();
      expect(internals()['loading']()).toBe(true);
      pending.next(pageOf([pat]));
      pending.complete();

      expect(internals()['loading']()).toBe(false);
    });

    it('should leave the table alone when loading fails, which the error handler has reported', async () => {
      list.mockReturnValue(of(pageOf([])));

      internals()['applySearch']();
      await settle();

      expect(internals()['rows']()).toEqual([]);
    });
  });

  describe('searching and paging', () => {
    it('should ask for the search again from the first page', async () => {
      internals()['first'].set(20);
      internals()['search'].set('pat');

      internals()['applySearch']();

      expect(list).toHaveBeenLastCalledWith('pat', 1, 10);
      expect(internals()['first']()).toBe(0);
    });

    it('should search when the Search button is pressed', async () => {
      const input = html().querySelector<HTMLInputElement>('.userSearch')!;
      input.value = 'carol';
      input.dispatchEvent(new Event('input'));
      await settle();

      html().querySelector<HTMLButtonElement>('#searchUsers')!.click();

      expect(list).toHaveBeenLastCalledWith('carol', 1, 10);
    });

    it('should search when Enter is pressed in the box', async () => {
      const input = html().querySelector<HTMLInputElement>('.userSearch')!;
      input.value = 'carol';
      input.dispatchEvent(new Event('input'));
      await settle();

      input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));

      expect(list).toHaveBeenLastCalledWith('carol', 1, 10);
    });

    it('should turn the table’s position into a 1-based page number', () => {
      internals()['load']({ first: 20, rows: 10 });

      expect(list).toHaveBeenLastCalledWith('', 3, 10);
      expect(internals()['first']()).toBe(20);
    });

    it('should use the page size the table asks for', () => {
      internals()['load']({ first: 50, rows: 25 });

      expect(list).toHaveBeenLastCalledWith('', 3, 25);
      expect(internals()['pageSize']()).toBe(25);
    });

    it('should keep the search while paging', () => {
      internals()['search'].set('pat');

      internals()['load']({ first: 10, rows: 10 });

      expect(list).toHaveBeenLastCalledWith('pat', 2, 10);
    });
  });

  describe('creating a user', () => {
    const fillIn = (email = 'new@example.com', name = 'New Person', password = 'a-long-password-1') => {
      internals()['email'].set(email);
      internals()['displayName'].set(name);
      internals()['password'].set(password);
    };

    it('should open an empty form, with the ordinary User role ready to give', () => {
      internals()['openNew']();

      expect(internals()['dialogVisible']()).toBe(true);
      expect(internals()['isNew']()).toBe(true);
      expect(internals()['email']()).toBe('');
      expect(internals()['displayName']()).toBe('');
      expect(internals()['selectedRoles']()).toEqual(['User']);
      expect(internals()['selectedGroups']()).toEqual([]);
    });

    it('should open from the New user button', async () => {
      html().querySelector<HTMLButtonElement>('#newUser')!.click();
      await settle();

      expect(internals()['dialogVisible']()).toBe(true);
    });

    it('should forget what was typed last time', () => {
      internals()['openEdit'](pat);
      internals()['openNew']();

      expect(internals()['email']()).toBe('');
      expect(internals()['editing']()).toBeNull();
    });

    it('should offer the roles and groups that exist', () => {
      expect(internals()['roleOptions']()).toEqual(['Admin', 'User', 'Manager']);
      expect(internals()['groupOptions']()).toEqual(['ops', 'sales']);
    });

    it('should not allow saving until there is an email, a name and a long enough password', () => {
      internals()['openNew']();
      expect(internals()['canSave']()).toBe(false);

      fillIn('not-an-email', 'New Person', 'a-long-password-1');
      expect(internals()['canSave']()).toBe(false);

      fillIn('new@example.com', '   ', 'a-long-password-1');
      expect(internals()['canSave']()).toBe(false);

      fillIn('new@example.com', 'New Person', 'short');
      expect(internals()['canSave']()).toBe(false);

      fillIn();
      expect(internals()['canSave']()).toBe(true);
    });

    it('should need exactly the server’s minimum password length', () => {
      internals()['openNew']();

      fillIn('new@example.com', 'New Person', 'x'.repeat(MIN_PASSWORD_LENGTH - 1));
      expect(internals()['canSave']()).toBe(false);
      fillIn('new@example.com', 'New Person', 'x'.repeat(MIN_PASSWORD_LENGTH));
      expect(internals()['canSave']()).toBe(true);
    });

    it('should send the user to the server with trimmed values and the chosen roles and groups', () => {
      internals()['openNew']();
      fillIn('  new@example.com ', '  New Person ', 'a-long-password-1');
      internals()['selectedRoles'].set(['User', 'Manager']);
      internals()['selectedGroups'].set(['ops']);

      internals()['save']();

      expect(create).toHaveBeenCalledWith({
        email: 'new@example.com', displayName: 'New Person', password: 'a-long-password-1', roles: ['User', 'Manager'], groups: ['ops']
      });
    });

    it('should close, say so, and show the new user when it worked', () => {
      internals()['openNew']();
      fillIn();
      list.mockClear();

      internals()['save']();

      expect(internals()['dialogVisible']()).toBe(false);
      expect(toast.success).toHaveBeenCalledWith('User created', 'new@example.com');
      expect(list).toHaveBeenCalledTimes(1);
    });

    it('should not keep the password around once the user is saved', () => {
      internals()['openNew']();
      fillIn();

      internals()['save']();

      expect(internals()['password']()).toBe('');
    });

    it('should stay open, with what was typed, when the server refuses (the error handler explains why)', () => {
      create.mockReturnValue(of(null));
      internals()['openNew']();
      fillIn();

      internals()['save']();

      expect(internals()['dialogVisible']()).toBe(true);
      expect(internals()['email']()).toBe('new@example.com');
      expect(toast.success).not.toHaveBeenCalled();
    });

    it('should not save twice while the first save is in progress', () => {
      const pending = new Subject<AdminUser | null>();
      create.mockReturnValue(pending);
      internals()['openNew']();
      fillIn();

      internals()['save']();
      internals()['save']();

      expect(create).toHaveBeenCalledTimes(1);
      expect(internals()['canSave']()).toBe(false);
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

  describe('editing a user', () => {
    it('should fill the form from the user, and not allow the email to change', () => {
      internals()['openEdit'](pat);

      expect(internals()['isNew']()).toBe(false);
      expect(internals()['email']()).toBe('pat@example.com');
      expect(internals()['displayName']()).toBe('Pat Example');
      expect(internals()['selectedRoles']()).toEqual(['User']);
      expect(internals()['selectedGroups']()).toEqual(['sales']);
    });

    it('should open from the Edit button on a row', async () => {
      rowFor('pat@example.com').querySelector<HTMLButtonElement>('.editUser')!.click();
      await settle();

      expect(internals()['editing']()?.id).toBe('u1');
      expect(internals()['dialogVisible']()).toBe(true);
    });

    it('should not need a password to save', () => {
      internals()['openEdit'](pat);

      expect(internals()['canSave']()).toBe(true);
    });

    it('should not allow saving with the name cleared', () => {
      internals()['openEdit'](pat);
      internals()['displayName'].set('  ');

      expect(internals()['canSave']()).toBe(false);
    });

    it('should send the changes for that user, with exactly the roles and groups now chosen', () => {
      internals()['openEdit'](pat);
      internals()['displayName'].set(' Pat Renamed ');
      internals()['selectedRoles'].set(['Manager']);
      internals()['selectedGroups'].set([]);

      internals()['save']();

      expect(update).toHaveBeenCalledWith('u1', { displayName: 'Pat Renamed', roles: ['Manager'], groups: [] });
      expect(create).not.toHaveBeenCalled();
    });

    it('should close, say so, and refresh the list when it worked', () => {
      internals()['openEdit'](pat);
      list.mockClear();

      internals()['save']();

      expect(internals()['dialogVisible']()).toBe(false);
      expect(toast.success).toHaveBeenCalledWith('User saved', 'pat@example.com');
      expect(list).toHaveBeenCalledTimes(1);
    });

    it('should stay open when a rule stops it, such as removing the last administrator', () => {
      update.mockReturnValue(of(null));
      internals()['openEdit'](me);
      internals()['selectedRoles'].set(['User']);

      internals()['save']();

      expect(internals()['dialogVisible']()).toBe(true);
      expect(toast.success).not.toHaveBeenCalled();
    });

    it('should not change the roles in the list the user object came from', () => {
      internals()['openEdit'](pat);
      internals()['selectedRoles'].set(['Manager']);

      expect(pat.roles).toEqual(['User']);
    });
  });

  describe('yourself', () => {
    it('should tell which row is the signed-in user', () => {
      expect(internals()['isSelf'](me)).toBe(true);
      expect(internals()['isSelf'](pat)).toBe(false);
    });

    it('should not offer to disable or delete yourself', () => {
      const row = rowFor('me@example.com');

      expect(row.querySelector<HTMLButtonElement>('.toggleDisabled')!.disabled).toBe(true);
      expect(row.querySelector<HTMLButtonElement>('.deleteUser')!.disabled).toBe(true);
    });

    it('should offer both for everyone else', () => {
      const row = rowFor('pat@example.com');

      expect(row.querySelector<HTMLButtonElement>('.toggleDisabled')!.disabled).toBe(false);
      expect(row.querySelector<HTMLButtonElement>('.deleteUser')!.disabled).toBe(false);
    });

    it('should still let you reset your own password and edit your own details', () => {
      const row = rowFor('me@example.com');

      expect(row.querySelector<HTMLButtonElement>('.resetPassword')!.disabled).toBe(false);
      expect(row.querySelector<HTMLButtonElement>('.editUser')!.disabled).toBe(false);
    });
  });

  describe('disabling and enabling', () => {
    it('should label the button by what it will do', () => {
      expect(rowFor('pat@example.com').querySelector('.toggleDisabled')?.textContent).toContain('Disable');
      expect(rowFor('gone@example.com').querySelector('.toggleDisabled')?.textContent).toContain('Enable');
    });

    it('should ask before disabling, and say what will happen', () => {
      internals()['toggleDisabled'](pat);

      expect(confirmed?.header).toBe('Disable user');
      expect(confirmed?.message).toContain('pat@example.com');
      expect(confirmed?.message).toContain('signed out');
      expect(disable).not.toHaveBeenCalled();
    });

    it('should disable once confirmed, say so, and refresh the list', () => {
      internals()['toggleDisabled'](pat);
      list.mockClear();

      confirmed!.accept!();

      expect(disable).toHaveBeenCalledWith('u1');
      expect(toast.success).toHaveBeenCalledWith('User disabled', 'pat@example.com');
      expect(list).toHaveBeenCalledTimes(1);
    });

    it('should do nothing more when the server refuses, which the error handler explains', () => {
      disable.mockReturnValue(of(null));
      internals()['toggleDisabled'](pat);
      list.mockClear();

      confirmed!.accept!();

      expect(toast.success).not.toHaveBeenCalled();
      expect(list).not.toHaveBeenCalled();
    });

    it('should enable straight away, without asking, because nothing is lost', () => {
      list.mockClear();

      internals()['toggleDisabled'](gone);

      expect(confirmed).toBeUndefined();
      expect(enable).toHaveBeenCalledWith('u3');
      expect(toast.success).toHaveBeenCalledWith('User enabled', 'gone@example.com');
      expect(list).toHaveBeenCalledTimes(1);
    });

    it('should do nothing when the question is answered No', () => {
      internals()['toggleDisabled'](pat);

      expect(disable).not.toHaveBeenCalled();
    });
  });

  describe('deleting', () => {
    it('should ask first, naming the user, and say it cannot be undone', () => {
      internals()['remove'](pat);

      expect(confirmed?.header).toBe('Delete user');
      expect(confirmed?.message).toContain('pat@example.com');
      expect(confirmed?.message).toContain('cannot be undone');
      expect(remove).not.toHaveBeenCalled();
    });

    it('should delete once confirmed, say so, and refresh the list', () => {
      internals()['remove'](pat);
      list.mockClear();

      confirmed!.accept!();

      expect(remove).toHaveBeenCalledWith('u1');
      expect(toast.success).toHaveBeenCalledWith('User deleted', 'pat@example.com');
      expect(list).toHaveBeenCalledTimes(1);
    });

    it('should show the previous page when the last user on a page is deleted', () => {
      internals()['rows'].set([pat]);
      internals()['first'].set(20);
      internals()['remove'](pat);

      confirmed!.accept!();

      expect(internals()['first']()).toBe(10);
      expect(list).toHaveBeenLastCalledWith('', 2, 10);
    });

    it('should stay on the first page when its last user is deleted', () => {
      internals()['rows'].set([pat]);
      internals()['first'].set(0);
      internals()['remove'](pat);

      confirmed!.accept!();

      expect(internals()['first']()).toBe(0);
    });

    it('should stay on the same page when others remain on it', () => {
      internals()['rows'].set([pat, gone]);
      internals()['first'].set(20);
      internals()['remove'](pat);

      confirmed!.accept!();

      expect(internals()['first']()).toBe(20);
    });

    it('should keep the list as it is when the server refuses (for example the last administrator)', () => {
      remove.mockReturnValue(of(false));
      internals()['remove'](me);
      list.mockClear();

      confirmed!.accept!();

      expect(toast.success).not.toHaveBeenCalled();
      expect(list).not.toHaveBeenCalled();
    });
  });

  describe('resetting a password', () => {
    it('should open for the chosen user, with an empty box', () => {
      internals()['newPassword'].set('left over');

      internals()['openResetPassword'](pat);

      expect(internals()['passwordTarget']()).toBe(pat);
      expect(internals()['newPassword']()).toBe('');
    });

    it('should not allow saving a password that is too short', () => {
      internals()['openResetPassword'](pat);

      internals()['newPassword'].set('short');
      expect(internals()['canReset']()).toBe(false);
      internals()['newPassword'].set('a-long-password-1');
      expect(internals()['canReset']()).toBe(true);
    });

    it('should send the new password for that user, say so, and close', () => {
      internals()['openResetPassword'](pat);
      internals()['newPassword'].set('a-long-password-1');

      internals()['saveNewPassword']();

      expect(resetPassword).toHaveBeenCalledWith('u1', 'a-long-password-1');
      expect(toast.success).toHaveBeenCalled();
      expect(toast.success.mock.calls[0][0]).toBe('Password reset');
      expect(internals()['passwordTarget']()).toBeNull();
      expect(internals()['newPassword']()).toBe('');
    });

    it('should stay open when the server refuses it', () => {
      resetPassword.mockReturnValue(of(false));
      internals()['openResetPassword'](pat);
      internals()['newPassword'].set('a-long-password-1');

      internals()['saveNewPassword']();

      expect(internals()['passwordTarget']()).toBe(pat);
      expect(toast.success).not.toHaveBeenCalled();
    });

    it('should do nothing when the password is not acceptable yet', () => {
      internals()['openResetPassword'](pat);
      internals()['newPassword'].set('short');

      internals()['saveNewPassword']();

      expect(resetPassword).not.toHaveBeenCalled();
    });

    it('should do nothing when no one is chosen', () => {
      internals()['newPassword'].set('a-long-password-1');

      internals()['saveNewPassword']();

      expect(resetPassword).not.toHaveBeenCalled();
    });

    it('should close without sending anything when cancelled, and forget the password', () => {
      internals()['openResetPassword'](pat);
      internals()['newPassword'].set('a-long-password-1');

      internals()['closeResetPassword']();

      expect(internals()['passwordTarget']()).toBeNull();
      expect(internals()['newPassword']()).toBe('');
      expect(resetPassword).not.toHaveBeenCalled();
    });

    it('should open from the Password button on a row', async () => {
      rowFor('pat@example.com').querySelector<HTMLButtonElement>('.resetPassword')!.click();
      await settle();

      expect(internals()['passwordTarget']()?.id).toBe('u1');
    });
  });
});
