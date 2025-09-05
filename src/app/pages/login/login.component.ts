import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Uključujemo potrebne module
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { username: '', password: '' }; // ✅ Povezano sa HTML formom
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.user).subscribe((response: any) => {
      if (response.success) {
        localStorage.setItem('userRole', response.role);
        console.log('Uspješna prijava, korisnička uloga:', response.role);
        this.authService.authStatusChanged.emit(true); // ✅ Obaveštava navbar
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Neispravni podaci za prijavu!';
      }
    }, error => {
      this.errorMessage = 'Došlo je do greške pri prijavi!';
    });
  }

}
