import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  hoverClass: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = signal<MenuItem[]>([
    { 
      id: 'dashboard', 
      label: 'דשבורד', 
      icon: 'bar-chart-3', 
      route: '/dashboard',
      hoverClass: 'hover:from-purple-50 hover:to-blue-50 hover:text-purple-700'
    },
    { 
      id: 'users', 
      label: 'ניהול משתמשים', 
      icon: 'users', 
      route: '/users',
      hoverClass: 'hover:from-blue-50 hover:to-cyan-50 hover:text-blue-700'
    },
    { 
      id: 'files', 
      label: 'ניהול קבצים', 
      icon: 'file-text', 
      route: '/files',
      hoverClass: 'hover:from-green-50 hover:to-emerald-50 hover:text-green-700'
    },
    { 
      id: 'categories', 
      label: 'קטגוריות', 
      icon: 'folder-open', 
      route: '/categories',
      hoverClass: 'hover:from-orange-50 hover:to-yellow-50 hover:text-orange-700'
    },
    { 
      id: 'settings', 
      label: 'הגדרות', 
      icon: 'settings', 
      route: '/settings',
      hoverClass: 'hover:from-pink-50 hover:to-rose-50 hover:text-pink-700'
    }
  ]);

  getButtonClass(item: MenuItem): string {
    return `text-gray-700 ${item.hoverClass}`;
  }
}
