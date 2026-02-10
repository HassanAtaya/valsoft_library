import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ApiService } from '../../services/api.service';
import { Permission } from '../../models/permission.model';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent implements OnInit {
  permissions: Permission[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getPermissions().subscribe(data => this.permissions = data);
  }
}
