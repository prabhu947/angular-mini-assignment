import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink } from '@angular/router';

import { Book, BookService } from '../../services/book.service';
import { StatusBadgePipe } from '../../pipes/status-badge.pipe';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatBadgeModule,
    RouterLink,
    StatusBadgePipe,
    TimeAgoPipe
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  issuedBooks: Book[] = [];
  loading = true;
  error: string | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadIssuedBooks();
  }

  loadIssuedBooks(): void {
    this.bookService.getIssuedBooks().subscribe({
      next: (books) => {
        this.issuedBooks = books;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load books. Please try again later.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}