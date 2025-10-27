import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // Log to console; in real apps, send to remote logging infrastructure
    // Keep user messaging to components/interceptors
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error);
  }
}
