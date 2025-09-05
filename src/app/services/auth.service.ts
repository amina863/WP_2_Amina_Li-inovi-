import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authStatusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  private apiUrl = 'http://localhost/backend'; // ✅ API putanja do backend-a

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, credentials).pipe(
      tap((response: any) => {
        if (response.success) {
          localStorage.setItem('userRole', response.role);
          this.authStatusChanged.emit(true);
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout.php`, {}).pipe(
      tap(() => {
        localStorage.removeItem('userRole');
        this.authStatusChanged.emit(false);
      })
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('userRole') !== null;
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  checkSession(): Observable<any> {
    return this.http.get(`${this.apiUrl}/session.php`).pipe(
      tap((response: any) => {
        if (response.isLoggedIn) {
          localStorage.setItem('userRole', response.role);
          this.authStatusChanged.emit(true);
        } else {
          localStorage.removeItem('userRole');
          this.authStatusChanged.emit(false);
        }
      })
    );
  }
} // ✅ OVA ZAGRADA MORA BITI TU!
