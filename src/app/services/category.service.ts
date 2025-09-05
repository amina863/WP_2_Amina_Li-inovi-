import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost/backend/categories.php';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addCategory(name: string): Observable<any> {
    return this.http.post(this.apiUrl, { name });
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.request('DELETE', this.apiUrl, { body: { id } });
  }

  // ✅ Dodat API poziv za dobijanje vesti iz određene kategorije
  getNewsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`http://localhost/backend/fashion_news.php?category_id=${categoryId}`);
  }
}
