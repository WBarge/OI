import { inject, Service } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

import { ErrorHandlerService, HandleError } from '../utils/error-handler.service';
import { AdminPage } from '../model/admin/admin-page';
import { AdminUser, NewAdminUser, UpdateAdminUser } from '../model/admin/admin-user';
import { ConfigService } from './config-service';

/**
 * User management, against OI.Auth's api/admin/users (administrators only: the server checks the Admin role).
 * A failed call has already been explained to the user by the error handler; it answers null (or false).
 */
@Service()
export class AdminUsersService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  private httpErrorHandler = inject(ErrorHandlerService);

  private readonly location: string;
  private handleError: HandleError;

  constructor() {
    this.location = this.configService.config.authApiUrl + 'admin/users';
    this.handleError = this.httpErrorHandler.createHandleError('AdminUsersService');
  }

  /** Page is 1-based. */
  list(search: string, page: number, pageSize: number): Observable<AdminPage<AdminUser>> {
    let params = new HttpParams().set('page', page).set('pageSize', pageSize);
    if (search.trim().length > 0) {
      params = params.set('search', search.trim());
    }
    return this.http.get<AdminPage<AdminUser>>(this.location, { params }).pipe(
      catchError(this.handleError<AdminPage<AdminUser>>('list', { data: [], totalRecordSize: 0 })),
    );
  }

  create(user: NewAdminUser): Observable<AdminUser | null> {
    return this.http.post<AdminUser>(this.location, user).pipe(
      catchError(this.handleError<AdminUser | null>('create', null)),
    );
  }

  update(id: string, changes: UpdateAdminUser): Observable<AdminUser | null> {
    return this.http.put<AdminUser>(this.urlFor(id), changes).pipe(
      catchError(this.handleError<AdminUser | null>('update', null)),
    );
  }

  resetPassword(id: string, newPassword: string): Observable<boolean> {
    return this.http.post(this.urlFor(id) + '/password', { newPassword }).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('resetPassword', false)),
    );
  }

  disable(id: string): Observable<AdminUser | null> {
    return this.http.post<AdminUser>(this.urlFor(id) + '/disable', {}).pipe(
      catchError(this.handleError<AdminUser | null>('disable', null)),
    );
  }

  enable(id: string): Observable<AdminUser | null> {
    return this.http.post<AdminUser>(this.urlFor(id) + '/enable', {}).pipe(
      catchError(this.handleError<AdminUser | null>('enable', null)),
    );
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete(this.urlFor(id)).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('delete', false)),
    );
  }

  private urlFor(id: string): string {
    return `${this.location}/${encodeURIComponent(id)}`;
  }
}
