import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

  goToManageUsers() {
    this.router.navigate(['/manage-users']);
  }

  goToManageNews() {
    this.router.navigate(['/manage-news']);
  }
}
