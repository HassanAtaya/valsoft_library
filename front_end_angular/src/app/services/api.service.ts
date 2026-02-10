import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Book } from '../models/book.model';
import { Role, RoleDto } from '../models/role.model';
import { Permission } from '../models/permission.model';
import { AppUser, UserDto } from '../models/user.model';
import { AiKey, AiDto, AiResponse } from '../models/ai.model';
import { CheckedHistory, CheckInDto } from '../models/history.model';
import { AuthUser } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private javaApi = environment.javaApiUrl + 'api/';
  private pythonApi = environment.pythonApiUrl;

  constructor(private http: HttpClient) {}

  // ===== Auth / Profile =====
  getMe(): Observable<AuthUser> { return this.http.get<AuthUser>(this.javaApi + 'auth/me'); }
  updateProfile(data: any): Observable<any> { return this.http.put(this.javaApi + 'auth/profile', data); }

  // ===== Permissions =====
  getPermissions(): Observable<Permission[]> { return this.http.get<Permission[]>(this.javaApi + 'permissions'); }

  // ===== Roles =====
  getRoles(): Observable<Role[]> { return this.http.get<Role[]>(this.javaApi + 'roles'); }
  createRole(dto: RoleDto): Observable<Role> { return this.http.post<Role>(this.javaApi + 'roles', dto); }
  updateRole(id: number, dto: RoleDto): Observable<Role> { return this.http.put<Role>(this.javaApi + 'roles/' + id, dto); }
  deleteRole(id: number): Observable<void> { return this.http.delete<void>(this.javaApi + 'roles/' + id); }

  // ===== Users =====
  getUsers(): Observable<AppUser[]> { return this.http.get<AppUser[]>(this.javaApi + 'users'); }
  createUser(dto: UserDto): Observable<AppUser> { return this.http.post<AppUser>(this.javaApi + 'users', dto); }
  updateUser(id: number, dto: UserDto): Observable<AppUser> { return this.http.put<AppUser>(this.javaApi + 'users/' + id, dto); }
  deleteUser(id: number): Observable<void> { return this.http.delete<void>(this.javaApi + 'users/' + id); }

  // ===== Books =====
  getBooks(): Observable<Book[]> { return this.http.get<Book[]>(this.javaApi + 'books'); }
  getAvailableBooks(): Observable<Book[]> { return this.http.get<Book[]>(this.javaApi + 'books/available'); }
  createBook(book: Book): Observable<Book> { return this.http.post<Book>(this.javaApi + 'books', book); }
  updateBook(id: number, book: Book): Observable<Book> { return this.http.put<Book>(this.javaApi + 'books/' + id, book); }
  deleteBook(id: number): Observable<void> { return this.http.delete<void>(this.javaApi + 'books/' + id); }

  // ===== AI Keys =====
  getAiKeys(): Observable<AiKey[]> { return this.http.get<AiKey[]>(this.javaApi + 'ai-keys'); }
  updateAiKey(id: number, data: Partial<AiKey>): Observable<AiKey> { return this.http.put<AiKey>(this.javaApi + 'ai-keys/' + id, data); }

  // ===== AI =====
  prepareAi(): Observable<AiDto> { return this.http.get<AiDto>(this.javaApi + 'ai/prepare'); }
  askAi(dto: AiDto): Observable<AiResponse> {
    return this.http.post<AiResponse>(this.pythonApi + 'api/ai/ask', {
      prompt_ai_books: dto.promptAiBooks,
      key_ai: dto.keyAi
    });
  }

  // ===== History =====
  getHistory(): Observable<CheckedHistory[]> { return this.http.get<CheckedHistory[]>(this.javaApi + 'history'); }
  checkIn(dto: CheckInDto): Observable<CheckedHistory> { return this.http.post<CheckedHistory>(this.javaApi + 'history/check-in', dto); }
  checkOut(id: number): Observable<CheckedHistory> { return this.http.post<CheckedHistory>(this.javaApi + 'history/check-out/' + id, {}); }
}
