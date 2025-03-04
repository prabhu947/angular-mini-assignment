import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated() {
      throw new Error('Method not implemented.');
  }
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.isLoggedInSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  public currentUser = this.currentUserSubject.asObservable();
  
  private users: User[] = [];

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.http.get<{users: User[]}>('assets/data/users.json')
      .pipe(
        catchError(() => of({ users: [] }))
      )
      .subscribe(data => {
        if (data?.users?.length > 0) {
          this.users = data.users;
        }
      });
  }

  login(username: string, password: string): Observable<boolean> {
    const user = this.users.find(u => 
      u.username === username && u.password === password);
    
    if (user) {
      this.isLoggedInSubject.next(true);
      this.currentUserSubject.next(username);
      return of(true);
    }
    return of(false);
  }

  register(username: string, password: string): Observable<boolean> {
    if (this.users.some(u => u.username === username)) {
      return of(false);
    }
    
    this.users.push({ username, password });
    return of(true);
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
  }
}