// src/app/shared/components/search-bar/search-bar.component.ts
import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-hero">
      <form (submit)="submit($event)" class="search-form" role="search" aria-label="User search">
        <input
          type="search"
          [(ngModel)]="query"
          name="q"
          class="search-input"
          [class.input-error]="error"
          [attr.aria-invalid]="error ? 'true' : 'false'"
          [disabled]="isLoading"
          placeholder="Search users by first name, last name or SSN (min 3 chars)"
          aria-label="Search users"
        />
        <button type="submit" class="search-btn" [disabled]="isLoading" aria-label="Search">
          <svg *ngIf="!isLoading" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <svg *ngIf="isLoading" class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v2M12 16v2M6 12h2M16 12h2"/></svg>
        </button>
      </form>
      <div role="alert" *ngIf="error" class="error-message">{{ error }}</div>
      <p class="hint">Enter first name, last name or SSN and press Enter or click Search</p>
    </div>
  `,
  styles: [
    `
    .search-hero{display:flex;flex-direction:column;align-items:center;gap:8px;padding:18px}
    .search-form{display:flex;width:100%;max-width:820px;background:linear-gradient(90deg,#ffffff, #fbfbff);padding:8px;border-radius:999px;box-shadow:0 6px 18px rgba(29,31,41,0.06);border:1px solid #eef0f6;transition:all 0.2s}
    .search-input{flex:1;border:0;padding:14px 18px;font-size:1rem;border-radius:999px;outline:none;transition:all 0.2s}
    .search-input::placeholder{color:#a8afbf}
    .search-input:disabled{background-color:#f3f4f6;cursor:not-allowed}
    .search-input.input-error{background-color:#fff5f5;box-shadow:0 0 0 2px #fee2e2}
    .search-btn{background:linear-gradient(90deg,#6a11cb,#2575fc);border:none;color:white;padding:10px 18px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s}
    .search-btn:disabled{background:#cbd5e1;cursor:not-allowed;opacity:0.7}
    .search-btn svg{filter:drop-shadow(0 1px 0 rgba(0,0,0,0.06));transition:all 0.2s}
    .hint{margin:0;color:#6b7280;font-size:0.9rem}
    .error-message{color:#dc2626;font-size:0.875rem;margin-top:0.5rem}
    .animate-spin{animation:spin 1s linear infinite}
    @keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    @media (max-width:720px){.search-form{max-width:100%;padding:6px}.search-input{padding:10px}}
    `
  ]
})
export class SearchBarComponent {
  query = '';
  error = '';
  isLoading = false;

  @Output() search = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<{ isLoading: boolean; error?: string }>();

  submit(evt: Event) {
    evt.preventDefault();
    this.error = '';
    this.emitIfValid();
  }

  @HostListener('keydown.enter', ['$event'])
  onEnter(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.error = '';
    this.emitIfValid();
  }

  private emitIfValid() {
    const q = (this.query || '').trim();
    if (q.length > 0 && q.length < 3) {
      this.error = 'Please enter at least 3 characters';
      this.statusChange.emit({ isLoading: false, error: this.error });
      return;
    }
    this.isLoading = true;
    this.statusChange.emit({ isLoading: true });
    this.search.emit(q);
    // Reset loading state after a short delay
    setTimeout(() => {
      this.isLoading = false;
      this.statusChange.emit({ isLoading: false });
    }, 300);
  }
}
