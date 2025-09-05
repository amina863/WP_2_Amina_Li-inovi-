import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-details',
  standalone: true,
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css'],
  imports: [CommonModule]
})
export class NewsDetailsComponent implements OnInit {
  news: any = {};

  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const newsId = params['id']; // ✅ Ostaviti kao string
      this.loadNewsDetails(newsId);
    });
  }

  loadNewsDetails(newsId: string): void { // ✅ newsId ostaje string
    this.newsService.getNewsById(newsId).subscribe((data: any) => {
      this.news = data;
    });
  }
}
