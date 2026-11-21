export class SystemError {
  public exceptionType!: string;
  public message!: string;
  /** Ties the response to the server-side log entry. Only present on errors raised by the exception handler. */
  public traceId?: string;
}
