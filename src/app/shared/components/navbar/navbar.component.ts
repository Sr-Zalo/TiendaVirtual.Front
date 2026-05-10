import { Component, OnInit, inject, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { AuthModalService } from '../../../core/services/auth-modal.service';
import { ModalService } from '../../../core/services/modal.service';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslocoModule],
  templateUrl: './navbar.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  private cartService = inject(CartService);
  private authModalService = inject(AuthModalService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private modalService = inject(ModalService);
  private translocoService = inject(TranslocoService);

  cartCount = 0;
  searchQuery = '';

  readonly navLinks = [
    { label: 'NOVEDADES', translationKey: 'navbar.links.news', path: '/novedades', query: {} },
    { label: 'PRÓXIMAMENTE', translationKey: 'navbar.links.comingSoon', path: '/proximamente', query: {} },
    { label: 'PROMOCIONES', translationKey: 'navbar.links.promotions', path: '/promociones', query: {} },
    { label: 'RECOMENDADOS', translationKey: 'navbar.links.recommended', path: '/recomendados', query: {} },
    { label: 'CATÁLOGO', translationKey: 'navbar.links.catalog', path: '/catalog', query: {} },
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

  async logout() {
    const confirmed = await this.modalService.confirm(
      this.translocoService.translate('modals.logout.title'),
      this.translocoService.translate('modals.logout.message'),
      this.translocoService.translate('modals.logout.confirm'),
      this.translocoService.translate('modals.logout.cancel')
    );
    if (!confirmed) return;
    this.authService.logout();
    this.cartCount = 0;
    this.router.navigate(['/']);
  }
}