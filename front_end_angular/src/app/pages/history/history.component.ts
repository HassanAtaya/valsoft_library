import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CheckedHistory } from '../../models/history.model';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, DialogModule, InputTextModule, DropdownModule, ConfirmDialogModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  @ViewChild('bookFilterInput') bookFilterInput!: ElementRef<HTMLInputElement>;

  history: CheckedHistory[] = [];
  availableBooks: Book[] = [];
  showCheckInDialog = false;

  selectedBook: Book | null = null;
  firstName = '';
  lastName = '';
  phoneNumber = '';
  bookFilter = '';

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private confirmService: ConfirmationService,
    private messageService: MessageService
  ) {}

  onDialogShow(): void {
    setTimeout(() => this.bookFilterInput?.nativeElement?.focus(), 100);
  }

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.api.getHistory().subscribe(data => this.history = data);
    this.api.getAvailableBooks().subscribe(data => this.availableBooks = data);
  }

  openCheckIn(): void {
    this.selectedBook = null;
    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.bookFilter = '';
    this.showCheckInDialog = true;
  }

  get filteredAvailableBooks(): Book[] {
    if (!this.bookFilter) return this.availableBooks;
    const f = this.bookFilter.toLowerCase();
    return this.availableBooks.filter(b =>
      b.title?.toLowerCase().includes(f) || b.name?.toLowerCase().includes(f)
    );
  }

  saveCheckIn(): void {
    if (!this.selectedBook?.id) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Please select a book' });
      return;
    }
    this.api.checkIn({
      bookId: this.selectedBook.id,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber
    }).subscribe({
      next: () => {
        this.showCheckInDialog = false;
        this.loadData();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book checked in' });
      }
    });
  }

  canCheckOut(entry: CheckedHistory): boolean {
    return entry.out === true && entry.action === 'IN';
  }

  confirmCheckOut(entry: CheckedHistory): void {
    this.confirmService.confirm({
      message: `Confirm check-out for "${entry.book?.title}"?`,
      header: 'Confirm Check Out',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.api.checkOut(entry.id).subscribe({
          next: () => {
            this.loadData();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book checked out' });
          }
        });
      }
    });
  }
}
