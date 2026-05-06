import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthModalService } from '../../../core/services/auth-modal.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModalComponent {
  modalService = inject(AuthModalService);
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  name = '';
  surname = '';
  error = '';
  loading = false;

  get isLogin() { return this.modalService.modalType() === 'login'; }
  get isRegister() { return this.modalService.modalType() === 'register'; }

  close() {
    this.modalService.close();
    this.reset();
  }

  switchToRegister() {
    this.modalService.openRegister();
    this.reset();
  }

  switchToLogin() {
    this.modalService.openLogin();
    this.reset();
  }

  reset() {
    this.email = '';
    this.password = '';
    this.name = '';
    this.surname = '';
    this.error = '';
    this.loading = false;
  }

  submitLogin() {
    this.error = '';
    this.loading = true;
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.close();
        window.location.reload();
      },
      error: () => {
        this.error = 'Email o contraseña incorrectos';
        this.loading = false;
      }
    });
  }

  submitRegister() {
    this.error = '';
    this.loading = true;
    this.authService.register({
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.switchToLogin();
        this.error = '';
      },
      error: () => {
        this.error = 'Error al registrarse. El email puede que ya esté en uso.';
        this.loading = false;
      }
    });
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('backdrop')) {
      this.close();
    }
  }
}