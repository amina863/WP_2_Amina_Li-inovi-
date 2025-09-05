import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  newsList: any[] = [];
  private newsService = inject(NewsService);

  constructor() {
    this.loadNews();
  }

  loadNews() {
    this.newsService.getAllNews().subscribe(data => {
      console.log('Vijesti:', data); // Debug ispis
      this.newsList = data;
    }, error => {
      console.error('Greška pri učitavanju vijesti:', error);
    });
  }
}
