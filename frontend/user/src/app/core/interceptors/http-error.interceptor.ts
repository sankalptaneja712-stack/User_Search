import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

// Centralized HTTP error interceptor to normalize backend errors
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An unexpected error occurred. Please try again.';

      // Prefer backend ApiError shape { message, status, error, path, timestamp }
      const data = error.error as any;
      if (data) {
        if (typeof data === 'string') {
          message = data;
        } else if (typeof data === 'object') {
          message = data.message || data.error || message;
        }
      }

      // Map common statuses to friendly messages when none provided
      if (!data || !data.message) {
        if (error.status === 0) message = 'Network error. Check your internet connection.';
        else if (error.status === 400) message = 'Bad request. Please check your input and try again.';
        else if (error.status === 404) message = 'The requested resource was not found.';
        else if (error.status >= 500) message = 'Server error. Please try again later.';
      }

      return throwError(() => new Error(message));
    })
  );
};
