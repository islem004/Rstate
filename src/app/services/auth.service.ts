// auth.service.ts - النسخة النهائية
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4000/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        const user = users[0];
        if (user && user.password === password) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }
        return null;
      })
    );
  }

  signup(data: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, data);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  // ← أضف السطر ده بس
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
  getUserId(): number | null {
  const user = this.getCurrentUser();
  return user ? user.id : null;
}

}