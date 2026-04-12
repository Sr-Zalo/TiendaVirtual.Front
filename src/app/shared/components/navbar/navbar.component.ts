import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  cartCount = 0;

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

  logout() {
    this.authService.logout();
    this.cartCount = 0;
    this.router.navigate(['/']);
  }
}