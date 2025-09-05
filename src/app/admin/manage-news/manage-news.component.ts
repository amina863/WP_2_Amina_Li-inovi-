import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsAdminService } from '../../services/news-admin.service';

@Component({
  selector: 'app-manage-news',
  standalone: true,
  templateUrl: './manage-news.component.html',
  imports: [CommonModule]
})
export class ManageNewsComponent implements OnInit {
  newsList: any[] = [];
  userRole: string = 'admin'; // Dodano da bi se dugmad prikazivala

  constructor(private newsAdminService: NewsAdminService) {}

  ngOnInit() {
    this.fetchNews();
  }

  fetchNews() {
    this.newsAdminService.getAllNews().subscribe(
      (data) => {
        console.log('Dohvaćene vesti:', data); // Debugging
        this.newsList = data;
      },
      (error) => {
        console.error('Greška pri učitavanju vijesti:', error);
      }
    );
  }

  deleteNews(newsId: number) {
    this.newsAdminService.deleteNews(newsId).subscribe(
      () => {
        this.newsList = this.newsList.filter(news => news.id !== newsId);
      },
      (error) => {
        console.error('Greška pri brisanju vijesti:', error);
      }
    );
  }
}
