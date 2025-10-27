import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { httpErrorInterceptor } from '../interceptors/http-error.interceptor';
import { environment } from '../../../environments/environment';

describe('UserService error handling', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should error early for short search text without hitting network', (done) => {
    service.searchUsers('ab').subscribe({
      next: () => fail('should error for short text'),
      error: (err: Error) => {
        expect(err.message).toContain('at least 3 characters');
        // ensure no HTTP request was made
        httpMock.expectNone(() => true);
        done();
      },
    });
  });

  it('should surface 404 message from backend ApiError on getUserById', (done) => {
    service.getUserById(9999).subscribe({
      next: () => fail('should have errored'),
      error: (err: Error) => {
        expect(err.message).toContain('not found');
        done();
      },
    });

  const req = httpMock.expectOne(`${environment.apiBaseUrl}/users/9999`);
    req.flush(
      { status: 404, error: 'Not Found', message: 'User not found with id 9999', path: '/api/users/9999' },
      { status: 404, statusText: 'Not Found' }
    );
  });
});
