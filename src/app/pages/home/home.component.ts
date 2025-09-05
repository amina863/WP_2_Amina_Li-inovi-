import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule], // ✅ Uključili smo neophodne module
})
export class HomeComponent implements OnInit {
  newsList: any[] = [];
  filteredNews: any[] = [];
  isFiltering: boolean = false;
  userRole: string = '';

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.newsService.getNewsByDate('').subscribe((data) => {
      this.newsList = data;
      this.isFiltering = false;
    });
  }

  filterNewsByDate(event: any): void {
    const selectedDate = event.target.value;
    this.newsService.getNewsByDate(selectedDate).subscribe((data) => {
      this.filteredNews = data;
      this.isFiltering = true;
    });
  }

  openCategory(categoryId: number): void {
    this.router.navigate(['/categories', categoryId]); // ✅ Ispravno rutiranje ka kategorijama
  }
}
