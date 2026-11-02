import { HttpErrorResponse } from '@angular/common/http';

/**
 * Thrown by the auth interceptor when the session could not be kept alive and the user is being sent
 * to the sign-in page. The error handler recognises it and stays quiet: the page change is the message.
 */
export class SessionEndedError extends HttpErrorResponse {
  constructor(url: string | null) {
    super({ status: 401, statusText: 'Session ended', url: url ?? undefined });
  }
}
