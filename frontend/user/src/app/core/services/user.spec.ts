import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../../features/users/models/user.model';

describe('UserService', () => {
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
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call searchUsers and return expected data', () => {
    const mockUsers: User[] = [
      {
        id: 1, firstName: 'John Doe', role: 'john@example.com',
        lastName: '',
        ssn: '',
        age: 0
      },
      {
        id: 2, firstName: 'Jane Doe', role: 'jane@example.com',
        lastName: '',
        ssn: '',
        age: 0
      },
    ];

    service.searchUsers('Doe').subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(
      (request) => request.url === 'http://localhost:8080/api/users/search' && request.params.get('text') === 'Doe'
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockUsers); // Mock the response
  });

  it('should handle empty search results', () => {
    service.searchUsers('Unknown').subscribe((users) => {
      expect(users.length).toBe(0);
      expect(users).toEqual([]);
    });

    const req = httpMock.expectOne(
      (request) => request.url === 'http://localhost:8080/api/users/search' && request.params.get('text') === 'Unknown'
    );
    req.flush([]); // Mock empty response
  });
});
