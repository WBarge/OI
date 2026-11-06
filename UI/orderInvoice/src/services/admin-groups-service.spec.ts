import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { AdminGroupsService } from './admin-groups-service';
import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';
import { AdminGroup, AdminGroupDetail } from '../model/admin/admin-group';

describe('AdminGroupsService', () => {
  let service: AdminGroupsService;
  let backend: HttpTestingController;
  let messageService: MessageService;

  const base = 'https://auth.test/api/admin/groups';
  const sales: AdminGroup = { name: 'sales', description: 'The sales team', memberCount: 2 };

  beforeEach(() => {
    const configuration = Object.assign(new Configuration(), { authApiUrl: 'https://auth.test/api/' });
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), MessageService, { provide: ConfigService, useValue: { config: configuration } }]
    });
    service = TestBed.inject(AdminGroupsService);
    backend = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    backend.verify();
    vi.restoreAllMocks();
  });

  it('should list the groups', () => {
    let result: AdminGroup[] | undefined;
    service.list().subscribe(value => (result = value));

    const request = backend.expectOne(base);
    expect(request.request.method).toBe('GET');
    request.flush([sales]);

    expect(result).toEqual([sales]);
  });

  it('should hand back no groups, and tell the user, when listing fails', () => {
    const addSpy = vi.spyOn(messageService, 'add');
    let result: AdminGroup[] | undefined;
    service.list().subscribe(value => (result = value));

    backend.expectOne(base).flush('no', { status: 500, statusText: 'Server Error' });

    expect(result).toEqual([]);
    expect(addSpy).toHaveBeenCalledTimes(1);
  });

  it('should get one group with its members', () => {
    const detail: AdminGroupDetail = { name: 'sales', description: null, members: [{ userId: 'u1', email: 'a@example.com', displayName: 'A' }] };
    let result: AdminGroupDetail | null | undefined;
    service.get('sales').subscribe(value => (result = value));

    const request = backend.expectOne(`${base}/sales`);
    expect(request.request.method).toBe('GET');
    request.flush(detail);

    expect(result).toEqual(detail);
  });

  it('should hand back null for a group that is gone', () => {
    let result: AdminGroupDetail | null | undefined = { name: 'x', description: null, members: [] };
    service.get('gone').subscribe(value => (result = value));

    backend.expectOne(`${base}/gone`).flush({ detail: 'That group does not exist.' }, { status: 404, statusText: 'Not Found' });

    expect(result).toBeNull();
  });

  it('should post a new group with its description', () => {
    let created: AdminGroup | null | undefined;
    service.create('sales', 'The sales team').subscribe(value => (created = value));

    const request = backend.expectOne(base);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ name: 'sales', description: 'The sales team' });
    request.flush(sales);

    expect(created).toEqual(sales);
  });

  it('should post a group with no description as null', () => {
    service.create('ops', null).subscribe();

    const request = backend.expectOne(base);
    expect(request.request.body).toEqual({ name: 'ops', description: null });
    request.flush({ name: 'ops', description: null, memberCount: 0 });
  });

  it('should hand back null when the group already exists', () => {
    let created: AdminGroup | null | undefined = sales;
    service.create('sales', null).subscribe(value => (created = value));

    backend.expectOne(base).flush({ detail: 'A group with that name already exists.' }, { status: 409, statusText: 'Conflict' });

    expect(created).toBeNull();
  });

  it('should put a new description, and only the description', () => {
    service.update('sales', 'New text').subscribe();

    const request = backend.expectOne(`${base}/sales`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual({ description: 'New text' });
    request.flush({ ...sales, description: 'New text' });
  });

  it('should delete a group and answer true', () => {
    let ok: boolean | undefined;
    service.delete('sales').subscribe(value => (ok = value));

    const request = backend.expectOne(`${base}/sales`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null, { status: 204, statusText: 'No Content' });

    expect(ok).toBe(true);
  });

  it('should answer false when a group cannot be deleted', () => {
    let ok: boolean | undefined;
    service.delete('sales').subscribe(value => (ok = value));

    backend.expectOne(`${base}/sales`).flush({ detail: 'x' }, { status: 404, statusText: 'Not Found' });

    expect(ok).toBe(false);
  });
});
