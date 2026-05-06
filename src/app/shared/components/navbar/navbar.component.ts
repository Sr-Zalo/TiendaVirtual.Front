import { Component, OnInit, inject, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { AuthModalService } from '../../../core/services/auth-modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  private cartService = inject(CartService);
  private authModalService = inject(AuthModalService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  cartCount = 0;
  searchQuery = '';

  readonly navLinks = [
    { label: 'NOVEDADES', path: '/novedades', query: {} },
    { label: 'PRÓXIMAMENTE', path: '/proximamente', query: {} },
    { label: 'PROMOCIONES', path: '/promociones', query: {} },
    { label: 'RECOMENDADOS', path: '/recomendados', query: {} },
    { label: 'CATÁLOGO', path: '/catalog', query: {} },
  ];

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.loadCartCount();
    }
  }

  loadCartCount() {
    this.cartService.getMyCart().subscribe({
      next: items => {
        this.cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
        this.cdr.detectChanges();
      },
      error: () => this.cartCount = 0
    });
  }

  search() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/catalog'], { queryParams: { q: this.searchQuery } });
    }
  }

  openLogin() {
    this.authModalService.openLogin();
  }

  openCart() {
    if (!this.authService.isLoggedIn()) {
      this.authModalService.openLogin();
      return;
    }
    this.router.navigate(['/cart']);
  }

  logout() {
    if (!confirm('¿Seguro que quieres cerrar sesión?')) return;
    this.authService.logout();
    this.cartCount = 0;
    this.router.navigate(['/']);
  }
}