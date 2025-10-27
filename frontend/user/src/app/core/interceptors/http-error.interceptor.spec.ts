import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './http-error.interceptor';

describe('httpErrorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([httpErrorInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should map ApiError.message on 400', (done) => {
    http.get('/api/test').subscribe({
      next: () => fail('should have errored'),
      error: (err: Error) => {
        expect(err.message).toBe('Validation failed');
        done();
      },
    });

    const req = httpMock.expectOne('/api/test');
    req.flush(
      { message: 'Validation failed', status: 400, error: 'Bad Request', path: '/api/test' },
      { status: 400, statusText: 'Bad Request' }
    );
  });

  it('should map to network error message when status 0', (done) => {
    http.get('/api/test2').subscribe({
      next: () => fail('should have errored'),
      error: (err: Error) => {
        expect(err.message).toContain('Network error');
        done();
      },
    });

    const req = httpMock.expectOne('/api/test2');
    req.flush('', { status: 0, statusText: 'Unknown Error' });
  });
});
