import { Book } from './book.model';

export interface CheckedHistory {
  id: number;
  action: string;
  date: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  book: Book;
  out: boolean;
}

export interface CheckInDto {
  bookId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
