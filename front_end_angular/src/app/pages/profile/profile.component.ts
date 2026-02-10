import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, InputTextareaModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('firstnameInput') firstnameInput!: ElementRef<HTMLInputElement>;

  firstname = '';
  lastname = '';
  password = '';
  preferences = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private messageService: MessageService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.firstnameInput?.nativeElement?.focus(), 100);
  }

  ngOnInit(): void {
    const user = this.auth.user;
    if (user) {
      this.firstname = user.firstname || '';
      this.lastname = user.lastname || '';
      this.preferences = user.preferences || '';
    }
  }

  save(): void {
    this.loading = true;
    const data: any = {
      firstname: this.firstname,
      lastname: this.lastname,
      preferences: this.preferences
    };
    if (this.password) data.password = this.password;

    this.api.updateProfile(data).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.auth.updateStoredUser({
          firstname: res.firstname,
          lastname: res.lastname,
          preferences: res.preferences
        });
        this.password = '';
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated' });
      },
      error: () => { this.loading = false; }
    });
  }
}
