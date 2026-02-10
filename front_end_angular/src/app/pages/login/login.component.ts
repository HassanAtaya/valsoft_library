import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, CheckboxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;

  username = '';
  password = '';
  ssoEnabled = false;
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/books']);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.usernameInput?.nativeElement?.focus(), 100);
  }

  onLogin(): void {
    if (this.ssoEnabled) {
      this.messageService.add({ severity: 'warn', summary: 'SSO', detail: 'SSO is not configured yet.' });
      return;
    }
    if (!this.username || !this.password) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Please fill in all fields' });
      return;
    }
    this.loading = true;
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        // Don't reset loading — component will be destroyed on navigate
        this.router.navigate(['/books']);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
