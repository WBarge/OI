import { HttpErrorResponse } from '@angular/common/http';
import { SessionEndedError } from './session-ended-error';

describe('SessionEndedError', () => {
  it('should be an HttpErrorResponse with status 401 so it flows through the existing error handling', () => {
    const error = new SessionEndedError('https://oi.test/api/Orders');

    expect(error).toBeInstanceOf(HttpErrorResponse);
    expect(error.status).toBe(401);
    expect(error.url).toBe('https://oi.test/api/Orders');
  });

  it('should be recognisable, unlike an ordinary 401', () => {
    const ordinary = new HttpErrorResponse({ status: 401 });

    expect(ordinary instanceof SessionEndedError).toBe(false);
    expect(new SessionEndedError(null) instanceof SessionEndedError).toBe(true);
  });
});
