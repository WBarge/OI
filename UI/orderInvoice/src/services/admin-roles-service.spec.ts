import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { AdminRolesService } from './admin-roles-service';
import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';
import { AdminRole } from '../model/admin/admin-role';

describe('AdminRolesService', () => {
  let service: AdminRolesService;
  let backend: HttpTestingController;
  let messageService: MessageService;

  const base = 'https://auth.test/api/admin/roles';
  const roles: AdminRole[] = [{ name: 'Admin', isBuiltIn: true, userCount: 1 }, { name: 'Auditor', isBuiltIn: false, userCount: 0 }];

  beforeEach(() => {
    const configuration = Object.assign(new Configuration(), { authApiUrl: 'https://auth.test/api/' });
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), MessageService, { provide: ConfigService, useValue: { config: configuration } }]
    });
    service = TestBed.inject(AdminRolesService);
    backend = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    backend.verify();
    vi.restoreAllMocks();
  });

  it('should list the roles', () => {
    let result: AdminRole[] | undefined;
    service.list().subscribe(value => (result = value));

    const request = backend.expectOne(base);
    expect(request.request.method).toBe('GET');
    request.flush(roles);

    expect(result).toEqual(roles);
  });

  it('should hand back no roles, and tell the user, when listing fails', () => {
    const addSpy = vi.spyOn(messageService, 'add');
    let result: AdminRole[] | undefined;
    service.list().subscribe(value => (result = value));

    backend.expectOne(base).flush('no', { status: 403, statusText: 'Forbidden' });

    expect(result).toEqual([]);
    expect(addSpy).toHaveBeenCalledTimes(1);
  });

  it('should post the name of a new role and hand back the role', () => {
    let created: AdminRole | null | undefined;
    service.create('Auditor').subscribe(value => (created = value));

    const request = backend.expectOne(base);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ name: 'Auditor' });
    request.flush(roles[1]);

    expect(created).toEqual(roles[1]);
  });

  it('should hand back null when the role already exists', () => {
    let created: AdminRole | null | undefined = roles[0];
    service.create('Auditor').subscribe(value => (created = value));

    backend.expectOne(base).flush({ detail: 'A role with that name already exists.' }, { status: 409, statusText: 'Conflict' });

    expect(created).toBeNull();
  });

  it('should delete a role by name, escaping the name, and answer true', () => {
    let ok: boolean | undefined;
    service.delete('Sales Lead').subscribe(value => (ok = value));

    const request = backend.expectOne(`${base}/Sales%20Lead`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null, { status: 204, statusText: 'No Content' });

    expect(ok).toBe(true);
  });

  it('should answer false when a role cannot be deleted', () => {
    let ok: boolean | undefined;
    service.delete('Admin').subscribe(value => (ok = value));

    backend.expectOne(`${base}/Admin`).flush({ detail: 'The Admin and User roles are built in and cannot be deleted.' }, { status: 409, statusText: 'Conflict' });

    expect(ok).toBe(false);
  });
});
