import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public auth: AuthService, private router: Router) {}

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
