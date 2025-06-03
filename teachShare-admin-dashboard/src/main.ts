import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// Lucide Icons
import { LucideAngularModule, 
  Users, FileText, BarChart3, Settings, FolderOpen, 
  Bell, Search, Download, Eye, Trash2, Edit, 
  CheckCircle, XCircle, TrendingUp, UserCheck, 
  Upload, Star, Heart, Zap, Menu, X, Plus, AlertCircle, AlertTriangle, UserX, Activity, HardDrive, EyeOff, RefreshCw, FileSpreadsheet,File
} from 'lucide-angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    importProvidersFrom(
      LucideAngularModule.pick({ 
        Users, FileText, BarChart3, Settings, FolderOpen, 
        Bell, Search, Download, Eye, Trash2, Edit, 
        CheckCircle, XCircle, TrendingUp, UserCheck, 
        Upload, Star, Heart, Zap, Menu, X,Plus ,AlertCircle,AlertTriangle,UserX,Activity
        ,HardDrive,EyeOff,RefreshCw,FileSpreadsheet,File

      })
    )
  ]
}).catch(err => console.error(err));