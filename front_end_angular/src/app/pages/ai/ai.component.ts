import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { AiKey } from '../../models/ai.model';

@Component({
  selector: 'app-ai',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, DialogModule, InputTextModule, InputTextareaModule],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.scss'
})
export class AiComponent implements OnInit {
  @ViewChild('aiKeyInput') aiKeyInput!: ElementRef<HTMLInputElement>;

  aiKeys: AiKey[] = [];
  showEditDialog = false;
  selectedKey: AiKey | null = null;
  editKeyValue = '';
  editPrompt = '';
  aiResponse = '';
  aiLoading = false;

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private messageService: MessageService
  ) {}

  onDialogShow(): void {
    setTimeout(() => this.aiKeyInput?.nativeElement?.focus(), 100);
  }

  ngOnInit(): void { this.loadKeys(); }

  loadKeys(): void {
    this.api.getAiKeys().subscribe(data => this.aiKeys = data);
  }

  openEdit(key: AiKey): void {
    this.selectedKey = key;
    this.editKeyValue = key.key;
    this.editPrompt = key.prompt;
    this.showEditDialog = true;
  }

  saveKey(): void {
    if (!this.selectedKey) return;
    this.api.updateAiKey(this.selectedKey.id, { key: this.editKeyValue, prompt: this.editPrompt }).subscribe({
      next: () => {
        this.showEditDialog = false;
        this.loadKeys();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'AI Key updated' });
      }
    });
  }

  useAi(): void {
    const user = this.auth.user;
    if (!user?.preferences) {
      this.messageService.add({
        severity: 'warn', summary: 'Preferences Required',
        detail: 'Please fill in your preferences in your Profile first.'
      });
      return;
    }

    this.aiLoading = true;
    this.aiResponse = '';

    this.api.prepareAi().subscribe({
      next: (aiDto) => {
        this.api.askAi(aiDto).subscribe({
          next: (res) => {
            this.aiLoading = false;
            if (res.error) {
              this.aiResponse = 'Error: ' + res.error;
            } else {
              this.aiResponse = res.response;
            }
          },
          error: () => {
            this.aiLoading = false;
            this.aiResponse = 'Failed to get AI response. Please check your API key.';
          }
        });
      },
      error: () => { this.aiLoading = false; }
    });
  }

  maskKey(key: string): string {
    if (!key) return '***';
    return '*'.repeat(Math.min(key.length, 20));
  }
}
