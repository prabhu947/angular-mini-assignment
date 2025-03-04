import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = [
    { name: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { name: 'Stock Management', icon: 'inventory_2', route: '/stock' },
    { name: 'Shipment Tracking', icon: 'local_shipping', route: '/grocery' },
    { name: 'Reports & Analytics', icon: 'analytics', route: '/reports' },
    { name: 'Customer Management', icon: 'people', route: '/customers' },
    { name: 'Food Safety Blogs', icon: 'article', route: '/blogs' }
  ];
  
  supportItems = [
    { name: 'Add', icon: 'task' },
    { name: 'My Account', icon: 'account_circle', route: '/account' },
    { name: 'Help & Support', icon: 'help', route: '/support' }
  ];
}