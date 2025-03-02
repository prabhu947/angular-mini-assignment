import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = [
    { name: 'Home', icon: 'home', route: '/home' },
    { name: 'Books', icon: 'library_books', route: '/books' },
    { name: 'Inbox', icon: 'inbox', route: '/inbox' },
    { name: 'Students', icon: 'people', route: '/students' },
    { name: 'Calendar', icon: 'calendar_today', route: '/calendar' },
    { name: 'Settings', icon: 'settings', route: '/settings' }
  ];
  
  supportItems = [
    { route: '/support1', icon: 'help', name: 'Support 1' },
    { route: '/support2', icon: 'contact_support', name: 'Support 2' }
  ];
}