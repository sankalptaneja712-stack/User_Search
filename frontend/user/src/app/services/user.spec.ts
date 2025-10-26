import { TestBed } from '@angular/core/testing';
import { NgZone } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from '../core/services/user.service';
import { User } from '../features/users/models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers = [
    {
      id: 29,
      firstName: 'Henry',
      lastName: 'Hill',
      age: 38,
      email: 'henry.hill@x.dummyjson.com',
      role: 'user'
    },
    {
      id: 30,
      firstName: 'Alice',
      lastName: 'Smith',
      age: 28,
      email: 'alice.smith@x.dummyjson.com',
      role: 'admin'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, { provide: NgZone, useValue: { run: (fn: any) => fn(), runOutsideAngular: (fn: any) => fn() } }]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search users by text', () => {
    const searchText = 'hen';
    service.searchUsers(searchText).subscribe((users: User[]) => {
      expect(users.length).toBe(1);
      expect(users[0].firstName).toBe('Henry');
    });

    const req = httpMock.expectOne((request) => 
      request.url === 'http://localhost:8080/api/users/search' && 
      request.params.get('text') === searchText
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockUsers[0]]);
  });
});
