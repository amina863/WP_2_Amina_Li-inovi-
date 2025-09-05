import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost/backend/comments.php';

  constructor(private http: HttpClient) {}

  getComments(newsId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?news_id=${newsId}`);
  }

  addComment(newsId: number, userId: number, content: string): Observable<any> {
    return this.http.post(this.apiUrl, { news_id: newsId, user_id: userId, content });
  }

  deleteComment(id: number): Observable<any> {
    return this.http.request('DELETE', this.apiUrl, { body: { id } });
  }
}
