import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'stock',
        loadComponent: () => import('./stock-management/stock-management.component')
          .then(m => m.StockManagementComponent),
        title: 'Stock Management'
      },
      {
        path: 'grocery',
        loadComponent: () => import('./grocery/grocery.component')
            .then(m => m.GroceryComponent),
        title: 'Grocery Management'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component')
          .then(m => m.DashboardComponent),
        title: 'Dashboard'
      }
    
    ]
  },
  { path: '**', redirectTo: '/home' }
];