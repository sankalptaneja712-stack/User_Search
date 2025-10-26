import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserGridComponent } from './user-grid.component';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../models/user.model';

describe('UserGridComponent', () => {
  let component: UserGridComponent;
  let fixture: ComponentFixture<UserGridComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  const mockUsers: User[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', ssn: '123-45-6789', age: 30, role: 'Admin' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', ssn: '987-65-4321', age: 25, role: 'User' },
    { id: 3, firstName: 'Bob', lastName: 'Brown', ssn: '111-22-3333', age: 40, role: 'Admin' }
  ];

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['searchUsers']);

    await TestBed.configureTestingModule({
      declarations: [UserGridComponent],
      providers: [{ provide: UserService, useValue: mockUserService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchUsers and populate users and filteredUsers', () => {
    mockUserService.searchUsers.and.returnValue(of(mockUsers));

    component.onSearch('query');

    expect(mockUserService.searchUsers).toHaveBeenCalledWith('query');
    expect(component.users).toEqual(mockUsers);
    expect(component.filteredUsers.length).toBe(3);
  });

  it('should filter users by role', () => {
    component.users = mockUsers;
    component.setRoleFilter('Admin');

    expect(component.filteredUsers.length).toBe(2);
    expect(component.filteredUsers.every(u => u.role === 'Admin')).toBeTrue();
  });

  it('should sort users in ascending order by age', () => {
    component.users = mockUsers;
    component.setSortDirection('asc');

    expect(component.filteredUsers[0].age).toBe(25);
    expect(component.filteredUsers[1].age).toBe(30);
    expect(component.filteredUsers[2].age).toBe(40);
  });

  it('should sort users in descending order by age', () => {
    component.users = mockUsers;
    component.setSortDirection('desc');

    expect(component.filteredUsers[0].age).toBe(40);
    expect(component.filteredUsers[1].age).toBe(30);
    expect(component.filteredUsers[2].age).toBe(25);
  });

  it('should apply role filter and sort together', () => {
    component.users = mockUsers;
    component.setRoleFilter('Admin');
    component.setSortDirection('desc');

    expect(component.filteredUsers.length).toBe(2);
    expect(component.filteredUsers[0].age).toBe(40);
    expect(component.filteredUsers[1].age).toBe(30);
  });
});
