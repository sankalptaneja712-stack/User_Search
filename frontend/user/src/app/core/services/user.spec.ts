import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../../features/users/models/user.model';
import { environment } from '../../../environments/environment';

function makeUser(overrides: Partial<User>): User {
  const base: User = {
    id: 0,
    firstName: '',
    lastName: '',
    age: 0,
    gender: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    birthDate: '',
    image: '',
    bloodGroup: '',
    height: 0,
    weight: 0,
    eyeColor: '',
    ip: '',
    macAddress: '',
    university: '',
    ein: '',
    ssn: '',
    userAgent: '',
    role: '',
    address: {
      address: '', city: '', state: '', stateCode: '', postalCode: '', country: '',
      coordinates: { lat: 0, lng: 0 }
    },
    bank: { cardExpire: '', cardNumber: '', cardType: '', currency: '', iban: '' },
    company: {
      department: '', name: '', title: '',
      address: { address: '', city: '', state: '', stateCode: '', postalCode: '', country: '', coordinates: { lat: 0, lng: 0 } }
    },
    crypto: { coin: '', wallet: '', network: '' },
  };
  return { ...base, ...overrides } as User;
}

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
      makeUser({ id: 1, firstName: 'John', lastName: 'Doe', role: 'admin', ssn: 'x' }),
      makeUser({ id: 2, firstName: 'Jane', lastName: 'Doe', role: 'user', ssn: 'y' }),
    ];

    service.searchUsers('Doe').subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(
      (request) => request.url === `${environment.apiBaseUrl}/users/search` && request.params.get('text') === 'Doe'
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
      (request) => request.url === `${environment.apiBaseUrl}/users/search` && request.params.get('text') === 'Unknown'
    );
    req.flush([]); // Mock empty response
  });
});
