import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost/backend/';

  constructor(private http: HttpClient) {}

  getNews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}get_news.php`);
  }

  getNewsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}fashion_news.php?category_id=${categoryId}`);
  }

  getNewsById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}get_news.php?id=${id}`);
  }

  getNewsByDate(date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}get_news.php?date=${date}`);
  }
deleteNews(newsId: number): Observable<any> {
  return this.http.delete(`http://localhost/backend/delete_news.php?id=${newsId}`);
}
addNews(newsData: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  return this.http.post('http://localhost/backend/add_news.php', newsData, { headers });
}

}
