import { Component, OnInit, inject, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { AuthModalService } from '../../core/services/auth-modal.service';
import { Product } from '../../core/models/product.model';
import { Router } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
    selector: 'app-promociones',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslocoModule],
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
    private translocoService = inject(TranslocoService);

    products: Product[] = [];
    loading = true;
    confirmProduct: Product | null = null;
    cartError = '';

    readonly categoryKeys: Record<string, string> = {
        'Juego de mesa': 'categories.boardGame',
        'Videojuego': 'categories.videoGame',
        'Libro': 'categories.book',
        'Coleccionable': 'categories.collectible',
        'Puzzle': 'categories.puzzle'
    };

    getCategoryKey(name: string): string {
        return this.categoryKeys[name] ?? name;
    }

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