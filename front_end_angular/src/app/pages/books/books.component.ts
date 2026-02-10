import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, DialogModule, InputTextModule, InputTextareaModule, InputNumberModule, ConfirmDialogModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
  @ViewChild('bookNameInput') bookNameInput!: ElementRef<HTMLInputElement>;

  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchText = '';
  showDialog = false;
  editMode = false;
  selectedBook: Book | null = null;

  form: Book = this.emptyBook();

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private confirmService: ConfirmationService,
    private messageService: MessageService
  ) {}

  onDialogShow(): void {
    setTimeout(() => this.bookNameInput?.nativeElement?.focus(), 100);
  }

  ngOnInit(): void { this.loadBooks(); }

  emptyBook(): Book {
    return { name: '', title: '', type: '', author: '', image: '', description: '', inStock: 0, borrowed: 0 };
  }

  loadBooks(): void {
    this.api.getBooks().subscribe(data => {
      this.books = data;
      this.filterBooks();
    });
  }

  filterBooks(): void {
    const s = this.searchText.toLowerCase();
    if (!s) { this.filteredBooks = [...this.books]; return; }
    this.filteredBooks = this.books.filter(b =>
      b.name?.toLowerCase().includes(s) ||
      b.title?.toLowerCase().includes(s) ||
      b.type?.toLowerCase().includes(s) ||
      b.author?.toLowerCase().includes(s) ||
      b.description?.toLowerCase().includes(s)
    );
  }

  openAdd(): void {
    this.editMode = false;
    this.selectedBook = null;
    this.form = this.emptyBook();
    this.showDialog = true;
  }

  openEdit(book: Book): void {
    this.editMode = true;
    this.selectedBook = book;
    this.form = { ...book };
    this.showDialog = true;
  }

  save(): void {
    const obs = this.editMode && this.selectedBook?.id
      ? this.api.updateBook(this.selectedBook.id, this.form)
      : this.api.createBook(this.form);

    obs.subscribe({
      next: () => {
        this.showDialog = false;
        this.loadBooks();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book saved' });
      }
    });
  }

  confirmDelete(book: Book): void {
    this.confirmService.confirm({
      message: `Delete book "${book.title}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.api.deleteBook(book.id!).subscribe({
          next: () => {
            this.loadBooks();
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Book deleted' });
          }
        });
      }
    });
  }

  getRowColor(book: Book): string {
    if (book.inStock === 0) return '#fed7d7';                    // red
    if (book.inStock === book.borrowed) return '#feebc8';        // orange
    if (book.inStock > book.borrowed) return '#c6f6d5';          // green
    return '#feebc8';
  }

  getTotal(book: Book): number {
    return (book.inStock || 0) + (book.borrowed || 0);
  }

  truncateDesc(desc: string): string {
    if (!desc) return '';
    return desc.length > 15 ? desc.substring(0, 15) + '...' : desc;
  }

  canDelete(book: Book): boolean {
    return !book.borrowed || book.borrowed === 0;
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      this.form.image = base64;
    };
    reader.readAsDataURL(file);
  }
}
