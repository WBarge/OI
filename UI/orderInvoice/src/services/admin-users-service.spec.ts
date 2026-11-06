import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { AdminUsersService } from './admin-users-service';
import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';
import { AdminUser } from '../model/admin/admin-user';

describe('AdminUsersService', () => {
  let service: AdminUsersService;
  let backend: HttpTestingController;
  let messageService: MessageService;

  const base = 'https://auth.test/api/admin/users';
  const user: AdminUser = { id: 'u1', email: 'pat@example.com', displayName: 'Pat', lockoutEnd: null, isDisabled: false, roles: ['User'], groups: [] };

  beforeEach(() => {
    const configuration = Object.assign(new Configuration(), { authApiUrl: 'https://auth.test/api/' });
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), MessageService, { provide: ConfigService, useValue: { config: configuration } }]
    });
    service = TestBed.inject(AdminUsersService);
    backend = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    backend.verify();
    vi.restoreAllMocks();
  });

  it('should not call the server until someone subscribes', () => {
    service.list('', 1, 10);

    backend.expectNone(() => true);
  });

  describe('list', () => {
    it('should ask for the page and page size', () => {
      service.list('', 3, 25).subscribe();

      const request = backend.expectOne(r => r.url === base);
      expect(request.request.method).toBe('GET');
      expect(request.request.params.get('page')).toBe('3');
      expect(request.request.params.get('pageSize')).toBe('25');
      request.flush({ data: [], totalRecordSize: 0 });
    });

    it('should send the search, trimmed', () => {
      service.list('  pat  ', 1, 10).subscribe();

      const request = backend.expectOne(r => r.url === base);
      expect(request.request.params.get('search')).toBe('pat');
      request.flush({ data: [], totalRecordSize: 0 });
    });

    it.each(['', '   '])('should leave the search out when it is blank (%j)', search => {
      service.list(search, 1, 10).subscribe();

      const request = backend.expectOne(r => r.url === base);
      expect(request.request.params.has('search')).toBe(false);
      request.flush({ data: [], totalRecordSize: 0 });
    });

    it('should hand back the page', () => {
      let page: unknown;
      service.list('', 1, 10).subscribe(value => (page = value));

      backend.expectOne(r => r.url === base).flush({ data: [user], totalRecordSize: 41 });

      expect(page).toEqual({ data: [user], totalRecordSize: 41 });
    });

    it('should hand back an empty page, and tell the user, when the call fails', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      let page: unknown;
      service.list('', 1, 10).subscribe(value => (page = value));

      backend.expectOne(r => r.url === base).flush('no', { status: 403, statusText: 'Forbidden' });

      expect(page).toEqual({ data: [], totalRecordSize: 0 });
      expect(addSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should post the new user', () => {
      const body = { email: 'pat@example.com', displayName: 'Pat', password: 'a-long-password-1', roles: ['User'], groups: [] };
      let created: unknown;
      service.create(body).subscribe(value => (created = value));

      const request = backend.expectOne(base);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(body);
      request.flush(user);

      expect(created).toEqual(user);
    });

    it('should hand back null, and warn the user with the reason, when the email is already used', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      let created: unknown = 'unset';
      service.create({ email: 'a@b.co', displayName: 'A', password: 'x', roles: [], groups: [] }).subscribe(value => (created = value));

      backend.expectOne(base).flush({ title: 'Conflict', detail: 'A user with that email address already exists.' }, { status: 409, statusText: 'Conflict' });

      expect(created).toBeNull();
      expect(addSpy.mock.calls[0][0].severity).toBe('warn');
      expect(addSpy.mock.calls[0][0].detail).toContain('already exists');
    });
  });

  describe('update', () => {
    it('should put the changes to the user', () => {
      const changes = { displayName: 'Pat Renamed', roles: ['Admin'], groups: ['sales'] };
      service.update('u1', changes).subscribe();

      const request = backend.expectOne(`${base}/u1`);
      expect(request.request.method).toBe('PUT');
      expect(request.request.body).toEqual(changes);
      request.flush(user);
    });

    it('should hand back null when a rule stops it', () => {
      let result: unknown = 'unset';
      service.update('u1', { displayName: 'x', roles: [], groups: [] }).subscribe(value => (result = value));

      backend.expectOne(`${base}/u1`).flush({ detail: 'There must always be at least one active administrator.' }, { status: 409, statusText: 'Conflict' });

      expect(result).toBeNull();
    });
  });

  describe('resetPassword', () => {
    it('should post the new password', () => {
      service.resetPassword('u1', 'a-long-password-1').subscribe();

      const request = backend.expectOne(`${base}/u1/password`);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual({ newPassword: 'a-long-password-1' });
      request.flush(null, { status: 204, statusText: 'No Content' });
    });

    it('should answer true when it worked', () => {
      let ok: boolean | undefined;
      service.resetPassword('u1', 'a-long-password-1').subscribe(value => (ok = value));

      backend.expectOne(`${base}/u1/password`).flush(null, { status: 204, statusText: 'No Content' });

      expect(ok).toBe(true);
    });

    it('should answer false when it failed', () => {
      let ok: boolean | undefined;
      service.resetPassword('u1', 'short').subscribe(value => (ok = value));

      backend.expectOne(`${base}/u1/password`).flush({ detail: 'too short' }, { status: 400, statusText: 'Bad Request' });

      expect(ok).toBe(false);
    });
  });

  describe('disable and enable', () => {
    it('should post to disable and hand back the user', () => {
      let result: unknown;
      service.disable('u1').subscribe(value => (result = value));

      const request = backend.expectOne(`${base}/u1/disable`);
      expect(request.request.method).toBe('POST');
      request.flush({ ...user, isDisabled: true });

      expect(result).toEqual({ ...user, isDisabled: true });
    });

    it('should post to enable and hand back the user', () => {
      let result: unknown;
      service.enable('u1').subscribe(value => (result = value));

      const request = backend.expectOne(`${base}/u1/enable`);
      expect(request.request.method).toBe('POST');
      request.flush(user);

      expect(result).toEqual(user);
    });

    it.each([['disable'], ['enable']] as const)('should hand back null when %s is refused', action => {
      let result: unknown = 'unset';
      service[action]('u1').subscribe(value => (result = value));

      backend.expectOne(`${base}/u1/${action}`).flush({ detail: 'no' }, { status: 409, statusText: 'Conflict' });

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should send a DELETE and answer true', () => {
      let ok: boolean | undefined;
      service.delete('u1').subscribe(value => (ok = value));

      const request = backend.expectOne(`${base}/u1`);
      expect(request.request.method).toBe('DELETE');
      request.flush(null, { status: 204, statusText: 'No Content' });

      expect(ok).toBe(true);
    });

    it('should answer false when it is refused', () => {
      let ok: boolean | undefined;
      service.delete('u1').subscribe(value => (ok = value));

      backend.expectOne(`${base}/u1`).flush({ detail: 'You cannot delete your own account.' }, { status: 409, statusText: 'Conflict' });

      expect(ok).toBe(false);
    });
  });

  it('should keep an id with unusual characters inside its own address segment', () => {
    service.delete('a/b c?d').subscribe();

    backend.expectOne(`${base}/a%2Fb%20c%3Fd`).flush(null, { status: 204, statusText: 'No Content' });
  });
});
