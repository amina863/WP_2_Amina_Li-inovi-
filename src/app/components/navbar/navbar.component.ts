import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // ✅ Dodato za osvežavanje
  ) {}

  ngOnInit(): void {
    this.checkUserSession();

    // ✅ Sluša promene u prijavi/odjavi i osvežava navbar
    this.authService.authStatusChanged.subscribe(() => {
      this.checkUserSession();
      this.cdr.detectChanges();
    });
  }


  checkUserSession(): void {
    const role = localStorage.getItem('userRole');
    console.log('Provera korisničke uloge:', role);

    this.isLoggedIn = role !== null;
    this.isAdmin = role === 'admin';

    this.cdr.detectChanges(); // ✅ Forsira Angular da ažurira prikaz
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('userRole');
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.router.navigate(['/']);
      this.cdr.detectChanges(); // ✅ Osvežava prikaz nakon odjave
    });
  }
}
