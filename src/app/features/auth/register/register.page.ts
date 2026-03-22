import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.page.html'
})
export class RegisterPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  name = '';
  surname = '';
  email = '';
  password = '';
  error = '';
  loading = false;

  submit() {
    this.error = '';
    this.loading = true;
    this.authService.register({
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => {
        this.error = 'Error al registrarse. El email puede que ya esté en uso.';
        this.loading = false;
      }
    });
  }
}