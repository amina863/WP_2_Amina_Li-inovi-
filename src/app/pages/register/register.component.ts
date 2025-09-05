import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  user = { name: '', lastname: '', username: '', email: '', password: '' };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post<{ success: boolean; message: string }>('http://localhost/backend/register.php', this.user)
      .subscribe(
        response => {
          if (response.success) {
            this.successMessage = 'Uspješna registracija! ';
            this.errorMessage = '';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else {
            this.errorMessage = response.message;
            this.successMessage = '';
          }
        },
        error => {
          this.errorMessage = 'Greška pri registraciji. Pokušajte ponovo.';
          this.successMessage = '';
        }
      );
  }
}
