import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../../features/users/models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/users`;

  searchUsers(text: string): Observable<User[]> {
    if (text && text.length < 3) {
      return throwError(() => new Error('Search text must be at least 3 characters'));
    }

    const params = new HttpParams().set('text', text);
    
    return this.http.get<User[]>(`${this.apiUrl}/search`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: unknown) {
    // If the global HTTP interceptor already normalized the error to an Error instance,
    // preserve its message and rethrow without remapping.
    if (error instanceof Error && !(error as any)?.status) {
      console.error('UserService Error:', error.message);
      return throwError(() => error);
    }

    const httpError = error as HttpErrorResponse;

    // Prefer backend ApiError.message if present, else fall back to status-specific messages
    let errorMessage = 'An error occurred. Please try again later.';

    const data = httpError?.error as any;
    if (data) {
      if (typeof data === 'string') {
        errorMessage = data;
      } else if (typeof data === 'object') {
        errorMessage = data.message || data.error || errorMessage;
      }
    }
    if (!data || !data.message) {
      if (httpError?.status === 0) errorMessage = 'Network error. Please check your internet connection.';
      else if (httpError?.status === 400) errorMessage = 'Invalid request. Please check your input.';
      else if (httpError?.status === 404) errorMessage = 'Resource not found.';
      else if ((httpError?.status ?? 0) >= 500) errorMessage = 'Server error. Please try again later.';
    }

    console.error('UserService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
