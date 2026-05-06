import { Component, OnInit, inject, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { AuthModalService } from '../../core/services/auth-modal.service';
import { Product } from '../../core/models/product.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-promociones',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './promociones.page.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PromocionesPage implements OnInit {
    private productService = inject(ProductService);
    private cartService = inject(CartService);
    private authService = inject(AuthService);
    private authModalService = inject(AuthModalService);
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);

    products: Product[] = [];
    loading = true;
    confirmProduct: Product | null = null;
    cartError = '';

    ngOnInit() {
        this.productService.getFiltered({ bestSellers: true }).subscribe({
            next: data => {
                this.products = data;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    openConfirm(product: Product) {
        if (!this.authService.isLoggedIn()) {
            this.authModalService.openLogin();
            return;
        }
        this.cartError = '';
        this.confirmProduct = product;
    }

    closeConfirm() {
        this.confirmProduct = null;
        this.cartError = '';
    }

    confirmAddToCart() {
        if (!this.confirmProduct) return;
        this.cartService.addToCart({
            productId: this.confirmProduct.productId,
            quantity: 1
        }).subscribe({
            next: () => {
                this.confirmProduct = null;
                this.cdr.detectChanges();
            },
            error: (err: Error) => {
                this.cartError = err.message;
                this.cdr.detectChanges();
            }
        });
    }
}