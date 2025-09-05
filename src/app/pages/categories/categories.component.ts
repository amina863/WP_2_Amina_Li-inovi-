import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { NewsService } from '../../services/news.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class CategoriesComponent implements OnInit {
  categoryNews: any[] = [];
  categoryId: number = 1;
  isAdmin: boolean = false;
  showForm: boolean = false; // ✅ Prikazivanje forme
  newNews = { title: '', content: '', image: '', category_id: 0 };

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private newsService: NewsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      this.loadCategoryNews(this.categoryId);
    });

    const userRole = localStorage.getItem('userRole');
    this.isAdmin = userRole === 'admin';
  }

  loadCategoryNews(categoryId: number): void {
    this.categoryService.getNewsByCategory(categoryId).subscribe((data: any) => {
      this.categoryNews = data;
    });
  }

  deleteNews(newsId: number): void {
    if (confirm('Da li ste sigurni da želite obrisati ovu vijest?')) {
      this.newsService.deleteNews(newsId).subscribe(() => {
        this.categoryNews = this.categoryNews.filter(news => news.id !== newsId);
      });
    }
  }

  openNewsForm(): void {
    this.showForm = true;
    this.newNews = { title: '', content: '', image: '', category_id: this.categoryId }; // ✅ Postavlja kategoriju
  }

  submitNews(): void {
    console.log('Slanje podataka:', this.newNews);

    this.newsService.addNews(this.newNews).subscribe(response => {
      console.log('Odgovor servera:', response);
      alert('Vijest dodana!');
      this.showForm = false;
      this.newNews = { title: '', content: '', image: '', category_id: this.categoryId }; // ✅ Resetuje polja
      this.loadCategoryNews(this.categoryId);
    }, error => {
      console.error('Greška pri slanju vesti:', error);
    });
  }


}
