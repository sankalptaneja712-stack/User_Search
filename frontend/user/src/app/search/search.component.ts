import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { User } from '../features/users/models/user.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="search-shell">
    <header class="hero">
      <h1 class="title">User Search</h1>
      <p class="subtitle">Enter first name, last name or SSN (min 3 chars) and press Enter or click Search</p>
      <div class="search-bar">
        <input
          type="search"
          [(ngModel)]="query"
          (keydown.enter)="onSearch()"
          placeholder="Search users by first name, last name or ssn"
          aria-label="Search users"
        />
        <button (click)="onSearch()" class="btn-search" aria-label="Search">🔎</button>
      </div>
    </header>

    <section class="controls" *ngIf="results.length">
      <div class="filter">
        <label>Filter by role:</label>
        <select [(ngModel)]="roleFilter">
          <option value="">All</option>
          <option *ngFor="let r of roles" [value]="r">{{ r }}</option>
        </select>
      </div>
      <div class="sort">
        <label>Sort by age:</label>
        <button (click)="toggleSort()">Age {{ sortOrder === 'asc' ? '↑' : '↓' }}</button>
      </div>
    </section>

    <section class="results">
      <div *ngIf="loading" class="message">Searching...</div>
      <div *ngIf="error" class="message error">{{ error }}</div>

      <div *ngIf="!loading && !error && results.length === 0" class="message">No users found</div>

      <div class="grid" *ngIf="results.length">
        <div class="grid-row grid-header">
          <div>ID</div>
          <div>Name</div>
          <div>Age</div>
          <div>Role</div>
          <div>SSN</div>
        </div>
        <div class="grid-row" *ngFor="let u of displayedUsers()">
          <div>{{ u.id }}</div>
          <div>{{ (u.firstName || '') + ' ' + (u.lastName || '') }}</div>
          <div>{{ u.age || '-' }}</div>
          <div>{{ u.role || '-' }}</div>
          <div>{{ u['ssn'] || '-' }}</div>
        </div>
      </div>
    </section>
  </div>
  `
})
export class SearchComponent {
  query = '';
  results: User[] = [];
  loading = false;
  error = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  roleFilter = '';
  roles: string[] = [];

  constructor(private userService: UserService) {}

  onSearch(): void {
    this.error = '';
    if (!this.query || this.query.trim().length < 3) {
      this.error = 'Please enter at least 3 characters to search';
      return;
    }

  this.loading = true;
  this.userService.searchUsers(this.query.trim()).subscribe({
      next: (u: User[]) => {
        this.results = u || [];
        this.roles = Array.from(new Set(this.results.map(r => r.role).filter(Boolean))) as string[];
        this.loading = false;
      },
      error: (err: Error) => {
        console.error('Search error', err);
        this.error = 'Search failed. Please try again.';
        this.loading = false;
      }
    });
  }

  toggleSort(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  displayedUsers(): User[] {
    let out = this.results.slice();
    if (this.roleFilter) {
      out = out.filter(u => u.role === this.roleFilter);
    }
    out.sort((a, b) => {
      const aa = a.age ?? 0;
      const bb = b.age ?? 0;
      return this.sortOrder === 'asc' ? aa - bb : bb - aa;
    });
    return out;
  }
}
