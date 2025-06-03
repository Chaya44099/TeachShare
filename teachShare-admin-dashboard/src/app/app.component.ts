import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilesComponent } from './components/files/files.component';
import { UsersComponent } from './components/users/users.component';
import { CategoriesComponent } from './components/categories/categories.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    LucideAngularModule,
    DashboardComponent,
    FilesComponent,
    UsersComponent,
    CategoriesComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeTab = signal('dashboard');

  menuItems = signal([
    { id: 'dashboard', label: 'דשבורד', icon: 'bar-chart-3', color: 'from-purple-600 to-blue-600' },
    { id: 'files', label: 'ניהול קבצים', icon: 'file-text', color: 'from-green-500 to-emerald-500' },
    { id: 'users', label: 'ניהול משתמשים', icon: 'users', color: 'from-blue-500 to-cyan-500' },
    { id: 'categories', label: 'קטגוריות', icon: 'folder-open', color: 'from-orange-500 to-yellow-500' },
     ]);

  setActiveTab(tabId: string) {
    this.activeTab.set(tabId);
  }

  getButtonClass(itemId: string): string {
    const baseClass = 'w-full flex items-center px-4 py-3 text-right rounded-lg transition-all duration-200';
    const item = this.menuItems().find(i => i.id === itemId);
    
    if (this.activeTab() === itemId) {
      return `${baseClass} bg-gradient-to-r ${item?.color} text-white shadow-lg`;
    }
    
    return `${baseClass} text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100`;
  }

  getPageTitle(): string {
    const titles: { [key: string]: string } = {
      'dashboard': 'דשבורד ראשי',
      'files': 'ניהול קבצים',
      'users': 'ניהול משתמשים',
      'categories': 'ניהול קטגוריות',
      'settings': 'הגדרות מערכת'
    };
    
    return titles[this.activeTab()] || 'ממשק ניהול';
  }
}