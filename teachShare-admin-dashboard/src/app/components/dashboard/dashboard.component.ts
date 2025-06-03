import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../services/api.service.service';
import { Stats } from '../../models/api.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  apiService = inject(ApiService);
  private destroy$ = new Subject<void>();
  
  stats = signal<Stats | null>(null);

  ngOnInit() {
    this.loadStats();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadStats() {
    this.apiService.getStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.stats.set(data);
        },
        error: (error) => {
          console.error('Error loading stats:', error);
        }
      });
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getStoragePercentage(): number {
    const stats = this.stats();
    if (!stats || !stats.storageLimit) return 0;
    return Math.round((stats.storageUsed / stats.storageLimit) * 100);
  }

  getLastBackupTime(): string {
    return 'לפני 2 שעות';
  }
}