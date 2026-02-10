import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { permissionGuard } from './guards/permission.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'permissions',
    loadComponent: () => import('./pages/permissions/permissions.component').then(m => m.PermissionsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'roles',
    loadComponent: () => import('./pages/roles/roles.component').then(m => m.RolesComponent),
    canActivate: [permissionGuard('add_role', 'edit_role', 'delete_role')]
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent),
    canActivate: [permissionGuard('add_user', 'edit_user', 'delete_user')]
  },
  {
    path: 'books',
    loadComponent: () => import('./pages/books/books.component').then(m => m.BooksComponent),
    canActivate: [permissionGuard('add_book', 'edit_book', 'delete_book')]
  },
  {
    path: 'ai',
    loadComponent: () => import('./pages/ai/ai.component').then(m => m.AiComponent),
    canActivate: [permissionGuard('edit_key')]
  },
  {
    path: 'history',
    loadComponent: () => import('./pages/history/history.component').then(m => m.HistoryComponent),
    canActivate: [permissionGuard('checking')]
  },
  { path: '**', redirectTo: 'login' }
];
