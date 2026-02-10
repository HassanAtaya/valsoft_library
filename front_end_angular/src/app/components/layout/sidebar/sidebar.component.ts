import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  permissions: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  collapsed = false;

  menuItems: MenuItem[] = [
    { label: 'Permissions', icon: 'pi pi-lock', route: '/permissions', permissions: [] },
    { label: 'Roles', icon: 'pi pi-shield', route: '/roles', permissions: ['add_role', 'edit_role', 'delete_role'] },
    { label: 'Users', icon: 'pi pi-users', route: '/users', permissions: ['add_user', 'edit_user', 'delete_user'] },
    { label: 'Books', icon: 'pi pi-book', route: '/books', permissions: ['add_book', 'edit_book', 'delete_book'] },
    { label: 'AI', icon: 'pi pi-microchip-ai', route: '/ai', permissions: ['edit_key'] },
    { label: 'History', icon: 'pi pi-history', route: '/history', permissions: ['checking'] }
  ];

  constructor(public auth: AuthService) {}

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  isVisible(item: MenuItem): boolean {
    if (item.permissions.length === 0) return true;
    return this.auth.hasAnyPermission(item.permissions);
  }
}
