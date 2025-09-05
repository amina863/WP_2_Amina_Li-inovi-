import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsAdminService {
  private apiUrl = 'http://localhost/your_project/api'; // Postavi pravi put do API-ja

  constructor(private http: HttpClient) {}

  // ======= METODE ZA VESTI =======
  getNews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/manage_news.php`);
  }

  addNews(newsData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/manage_news.php`, newsData);
  }

  updateNews(newsData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/manage_news.php`, newsData);
  }

  deleteNews(newsId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/manage_news.php?id=${newsId}`);
  }

  // ======= METODE ZA KORISNIKE =======
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/manage_users.php`);
  }

  addUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/manage_users.php`, userData);
  }

  updateUser(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/manage_users.php`, userData);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/manage_users.php?id=${userId}`);
  }
}
