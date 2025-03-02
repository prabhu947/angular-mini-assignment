import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { 
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent) 
      },
      {
        path: 'books',
        loadComponent: () => import('./components/books/books.component').then(c => c.BooksComponent)
      },
      {
        path: 'calendar',
        loadComponent: () => import('./components/calendar/calendar.component').then(c => c.CalendarComponent)
      },
      {
        path: 'students',
        loadComponent: () => import('./components/students/students.components').then(c => c.StudentsComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./components/settings/settings.components').then(c => c.SettingsComponent)
      }
    ]
  },
  { path: '**', redirectTo: '/home' }
];