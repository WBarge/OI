import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

import { ErrorHandlerService, HandleError } from '../utils/error-handler.service';
import { AdminGroup, AdminGroupDetail } from '../model/admin/admin-group';
import { ConfigService } from './config-service';

/**
 * Group management, against OI.Auth's api/admin/groups (administrators only).
 * Who is in a group is set from the user, not here.
 */
@Service()
export class AdminGroupsService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  private httpErrorHandler = inject(ErrorHandlerService);

  private readonly location: string;
  private handleError: HandleError;

  constructor() {
    this.location = this.configService.config.authApiUrl + 'admin/groups';
    this.handleError = this.httpErrorHandler.createHandleError('AdminGroupsService');
  }

  list(): Observable<AdminGroup[]> {
    return this.http.get<AdminGroup[]>(this.location).pipe(
      catchError(this.handleError<AdminGroup[]>('list', [])),
    );
  }

  /** One group and the users in it. */
  get(name: string): Observable<AdminGroupDetail | null> {
    return this.http.get<AdminGroupDetail>(this.urlFor(name)).pipe(
      catchError(this.handleError<AdminGroupDetail | null>('get', null)),
    );
  }

  create(name: string, description: string | null): Observable<AdminGroup | null> {
    return this.http.post<AdminGroup>(this.location, { name, description }).pipe(
      catchError(this.handleError<AdminGroup | null>('create', null)),
    );
  }

  /** The name never changes; only the description. */
  update(name: string, description: string | null): Observable<AdminGroup | null> {
    return this.http.put<AdminGroup>(this.urlFor(name), { description }).pipe(
      catchError(this.handleError<AdminGroup | null>('update', null)),
    );
  }

  delete(name: string): Observable<boolean> {
    return this.http.delete(this.urlFor(name)).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('delete', false)),
    );
  }

  private urlFor(name: string): string {
    return `${this.location}/${encodeURIComponent(name)}`;
  }
}
