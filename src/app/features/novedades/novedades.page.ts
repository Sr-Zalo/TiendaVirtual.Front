import { Component, OnInit, inject, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { AuthModalService } from '../../core/services/auth-modal.service';
import { Category } from '../../core/models/category.model';
import { Product } from '../../core/models/product.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-novedades',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './novedades.page.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NovedadesPage implements OnInit {
    private categoryService = inject(CategoryService);
    private productService = inject(ProductService);
    private cartService = inject(CartService);
    private authService = inject(AuthService);
    private authModalService = inject(AuthModalService);
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);

    categories: Category[] = [];
    productsByCategory: Record<number, Product[]> = {};
    loading = true;
    confirmProduct: Product | null = null;
    cartError = '';

    ngOnInit() {
        this.categoryService.getAll().subscribe({
            next: cats => {
                this.categories = cats;
                let loaded = 0;
                cats.forEach(cat => {
                    this.productService.getFiltered({ categoryId: cat.categoryId, newArrivals: true }).subscribe({
                        next: products => {
                            this.productsByCategory[cat.categoryId] = products.slice(0, 5);
                            loaded++;
                            if (loaded === cats.length) {
                                this.loading = false;
                                this.cdr.detectChanges();
                            }
                        },
                        error: () => {
                            loaded++;
                            if (loaded === cats.length) {
                                this.loading = false;
                                this.cdr.detectChanges();
                            }
                        }
                    });
                });
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