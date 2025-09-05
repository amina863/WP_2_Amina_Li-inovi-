import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent]
})
export class AppComponent implements OnInit {
  title = 'Modni Portal';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkSession().subscribe(response => {
      console.log('Sesija proverena:', response);
    });
  }
}
