import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, first } from 'rxjs/operators';

export interface Book {
  id: number;
  title: string;
  author: string;
  category?: string;
  coverImage?: string;
  issuedDate?: Date;
  dueDate?: Date;
  status: 'Available' | 'Issued' | 'Reserved' | 'Overdue';
  description?: string;
  rating?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/books'; 
  

  private booksSubject = new BehaviorSubject<Book[]>([]);
  public books$ = this.booksSubject.asObservable();
  

  private mockBooks: Book[] = [
    {
      id: 1,
      title: 'Introduction to Algorithm',
      author: 'Thomas H. Cormen',
      category: 'Computer Science',
      coverImage: 'assets/images/book1.jpg',
      issuedDate: new Date('2025-02-15'),
      dueDate: new Date('2025-03-15'),
      status: 'Issued',
      rating: 4.5
    },
    {
      id: 2,
      title: 'Design Patterns',
      author: 'Erich Gamma',
      category: 'Software Engineering',
      coverImage: 'assets/images/book2.jpg',
      issuedDate: new Date('2025-02-20'),
      dueDate: new Date('2025-03-20'),
      status: 'Issued',
      rating: 4.2
    },
    {
      id: 3,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      category: 'Software Engineering',
      coverImage: 'assets/images/book3.jpg',
      status: 'Available',
      rating: 4.8
    },
    {
      id: 4,
      title: 'Database Systems',
      author: 'Ramez Elmasri',
      category: 'Computer Science',
      coverImage: 'assets/images/book4.jpg',
      status: 'Reserved',
      rating: 4.0
    }
  ];

  constructor(private http: HttpClient) {

    this.booksSubject.next(this.mockBooks);
  }


  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(
      tap(books => {
        this.booksSubject.next(books);
      }),
      catchError(() => {

        console.log('Using mock book data as fallback');
        return of(this.mockBooks);
      })
    );
  }


  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {

        const book = this.mockBooks.find(b => b.id === id);
        if (!book) {
          throw new Error(`Book with ID ${id} not found`);
        }
        return of(book);
      })
    );
  }

  getBooksByCategory(category: string): Promise<Book[]> {
    return new Promise<Book[]>((resolve) => {
      this.books$.pipe(
        map(books => books.filter(book => book.category === category)),
        first()
      ).subscribe({
        next: (books: Book[]) => resolve(books),
        error: () => resolve([])  
      });
    });
  }


  getIssuedBooks(): Observable<Book[]> {
    return this.books$.pipe(
      map(books => books.filter(book => book.status === 'Issued'))
    );
  }


  getOverdueBooks(): Observable<Book[]> {
    return this.books$.pipe(
      map(books => books.filter(book => book.status === 'Overdue'))
    );
  }

  issueBook(id: number, dueDate: Date): Observable<Book> {
    const book = this.mockBooks.find(b => b.id === id);
    if (!book || book.status !== 'Available') {
      return throwError(() => new Error('Book not available'));
    }
    
    book.status = 'Issued';
    book.issuedDate = new Date();
    book.dueDate = dueDate;
    
    const updatedBooks = [...this.mockBooks];
    this.booksSubject.next(updatedBooks);
    
    return of(book);
  }
  

  returnBook(id: number): Observable<Book> {
    const book = this.mockBooks.find(b => b.id === id);
    if (!book || (book.status !== 'Issued' && book.status !== 'Overdue')) {
      return throwError(() => new Error('Book not issued'));
    }
    
    book.status = 'Available';
    book.issuedDate = undefined;
    book.dueDate = undefined;
    
    const updatedBooks = [...this.mockBooks];
    this.booksSubject.next(updatedBooks);
    
    return of(book);
  }
}