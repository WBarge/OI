import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

import { ErrorHandlerService, HandleError } from '../utils/error-handler.service';
import { AdminRole } from '../model/admin/admin-role';
import { ConfigService } from './config-service';

/** Role management, against OI.Auth's api/admin/roles (administrators only). */
@Service()
export class AdminRolesService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  private httpErrorHandler = inject(ErrorHandlerService);

  private readonly location: string;
  private handleError: HandleError;

  constructor() {
    this.location = this.configService.config.authApiUrl + 'admin/roles';
    this.handleError = this.httpErrorHandler.createHandleError('AdminRolesService');
  }

  list(): Observable<AdminRole[]> {
    return this.http.get<AdminRole[]>(this.location).pipe(
      catchError(this.handleError<AdminRole[]>('list', [])),
    );
  }

  create(name: string): Observable<AdminRole | null> {
    return this.http.post<AdminRole>(this.location, { name }).pipe(
      catchError(this.handleError<AdminRole | null>('create', null)),
    );
  }

  delete(name: string): Observable<boolean> {
    return this.http.delete(`${this.location}/${encodeURIComponent(name)}`).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('delete', false)),
    );
  }
}
