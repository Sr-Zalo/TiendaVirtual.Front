import { Component, OnInit, inject, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { AuthModalService } from '../../core/services/auth-modal.service';
import { Product } from '../../core/models/product.model';

@Component({
    selector: 'app-recomendados',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './recomendados.page.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecomendadosPage implements OnInit {
    private cartService = inject(CartService);
    private authService = inject(AuthService);
    private authModalService = inject(AuthModalService);
    private cdr = inject(ChangeDetectorRef);

    confirmProduct: Product | null = null;
    cartError = '';

    products: Product[] = [
        { productId: 1, name: 'Catan', price: 49.99, stock: 10, categoryName: 'Juego de mesa', categoryId: 1 },
        { productId: 2, name: 'Wingspan', price: 54.99, stock: 8, categoryName: 'Juego de mesa', categoryId: 1 },
        { productId: 3, name: 'Pandemic', price: 38.99, stock: 15, categoryName: 'Juego de mesa', categoryId: 1 },
        { productId: 4, name: 'Dixit', price: 32.99, stock: 12, categoryName: 'Juego de mesa', categoryId: 1 },
        { productId: 5, name: 'Azul', price: 34.99, stock: 9, categoryName: 'Juego de mesa', categoryId: 1 },
    ];

    ngOnInit() { }

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