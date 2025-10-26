// src/app/features/users/components/user-grid/user-grid.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import type { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchBarComponent,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule
  ],
})
export class UserGridComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  sortDirection: 'none' | 'asc' | 'desc' = 'none';
  roleFilter: string = '';
  roles: string[] = [];
  searchTriggered = false;

  hasActiveFilters(): boolean {
    return this.roleFilter !== '' || this.sortDirection !== 'none';
  }

  onSelectUser(user: User) {
    this.router.navigate(['/user', user.id]);
  }

  private roleColors = {
    admin: '#818cf8',
    user: '#34d399',
    manager: '#f59e0b'
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSearch(query: string) {
    this.searchTriggered = true;
    this.userService.searchUsers(query).subscribe(users => {
      this.users = users;
      this.roles = Array.from(new Set(this.users.map(u => u.role).filter(Boolean))) as string[];
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredUsers = this.users
      .filter(user =>
        this.roleFilter ? (user.role || '').toLowerCase() === this.roleFilter.toLowerCase() : true
      )
      .slice()
      .sort((a, b) => {
        if (this.sortDirection === 'none') return 0;
        const aa = a.age ?? 0;
        const bb = b.age ?? 0;
        return this.sortDirection === 'asc' ? aa - bb : bb - aa;
      });
  }

  setSortDirection(value: string) {
    this.sortDirection = value === 'asc' ? 'asc' : 'desc';
    this.applyFilters();
  }

  setRoleFilter(role: string) {
    this.roleFilter = role;
    this.applyFilters();
  }

  getAvatarColor(role: string | undefined): string {
    if (!role) return '#6b7280';
    return this.roleColors[role.toLowerCase() as keyof typeof this.roleColors] || '#6b7280';
  }
}
