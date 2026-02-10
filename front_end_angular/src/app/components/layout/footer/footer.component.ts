import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `<footer class="app-footer">valsoft_library &copy; 2026</footer>`,
  styles: [`
    .app-footer {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-sidebar-bg);
      color: rgba(255,255,255,0.7);
      font-size: 0.85rem;
      font-weight: 500;
    }
  `]
})
export class FooterComponent {}
