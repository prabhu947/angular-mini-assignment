import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Book, BookService } from '../../services/book.service';
import { BookCardComponent } from '../book-card/book-card.component';
import { SearchFilterPipe } from '../../pipes/search-filter.pipe';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatChipsModule,
    MatDialogModule,
    BookCardComponent,
  ],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchText = '';
  searchFields = ['title', 'author', 'category']; 
  loading = true;
  error: string | null = null;
  

  bookForm: FormGroup;
  isFormVisible = false;
  

  categories = [
    'Computer Science',
    'Software Engineering',
    'Fiction',
    'Science',
    'History',
    'Biography',
    'Mathematics',
    'Physics'
  ];
  
  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      description: [''],
      rating: [0, [Validators.min(0), Validators.max(5)]]
    });
  }
  
  ngOnInit(): void {
    this.loadBooks();
  }
  
  loadBooks(): void {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.filterBooks(); 
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load books. Please try again later.';
        this.loading = false;
        console.error(err);
      }
    });
  }
  
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.bookForm.reset();
    }
  }
  
  filterBooks(): void {
    if (!this.searchText.trim()) {
      this.filteredBooks = this.books;
      return;
    }
    

    this.filteredBooks = this.books.filter(book => {
      return this.searchFields.some(field => {
        const value = book[field as keyof Book];
        if (value === null || value === undefined) {
          return false;
        }
        return String(value).toLowerCase().includes(this.searchText.toLowerCase());
      });
    });
  }
  
  onBookAction(event: {action: string, bookId: number}): void {
    const { action, bookId } = event;
    
    switch (action) {
      case 'reserve':
        this.snackBar.open(`Book reserved successfully!`, 'Close', { duration: 3000 });
        break;
      case 'return':
        this.handleReturnBook(bookId);
        break;
      case 'cancel':
        this.snackBar.open(`Reservation cancelled`, 'Close', { duration: 3000 });
        break;
      case 'pay':
        this.snackBar.open(`Payment processed`, 'Close', { duration: 3000 });
        break;
      case 'details':
        this.showBookDetails(bookId);
        break;
      default:
        break;
    }
  }
  
  handleReturnBook(bookId: number): void {
    this.bookService.returnBook(bookId).subscribe({
      next: () => {
        this.snackBar.open('Book returned successfully!', 'Close', { duration: 3000 });
        this.loadBooks(); 
      },
      error: (err) => {
        this.snackBar.open(`Error: ${err.message}`, 'Close', { duration: 5000 });
      }
    });
  }
  
  showBookDetails(bookId: number): void {
    const book = this.books.find(b => b.id === bookId);
    if (book) {

      alert(`
        Title: ${book.title}
        Author: ${book.author}
        Category: ${book.category || 'N/A'}
        Status: ${book.status}
        Rating: ${book.rating || 'Not rated'}
      `);
    }
  }
  
  onSubmit(): void {
    if (this.bookForm.invalid) {

      Object.keys(this.bookForm.controls).forEach(key => {
        const control = this.bookForm.get(key);
        control?.markAsTouched();
      });
      return;
    }
    
    const newBook: Partial<Book> = {
      ...this.bookForm.value,
      status: 'Available',
      id: this.books.length > 0 ? Math.max(...this.books.map(b => b.id)) + 1 : 1
    };
    
    this.books.push(newBook as Book);
    this.filterBooks();
    this.snackBar.open('Book added successfully!', 'Close', { duration: 3000 });
    this.toggleForm();
    this.bookForm.reset();
  }
}