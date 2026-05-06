import { Component, OnInit, inject, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { AuthModalService } from '../../core/services/auth-modal.service';
import { AdminProductService } from '../../core/services/admin-product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.page.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailPage implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private authModalService = inject(AuthModalService);
  private adminProductService = inject(AdminProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  product: Product | null = null;
  relatedProducts: Product[] = [];
  loading = true;
  error = false;
  addedToCart = false;
  cartError = '';
  selectedImageIndex = 0;
  mockImages = [1, 2, 3, 4];

  get isAdmin() { return this.authService.isAdmin(); }
  get isBoardGame() { return this.product?.categoryName === 'Juego de mesa'; }
  get isVideoGame() { return this.product?.categoryName === 'Videojuego'; }
  get isBook() { return this.product?.categoryName === 'Libro'; }
  get isCollectible() { return this.product?.categoryName === 'Coleccionable'; }
  get isPuzzle() { return this.product?.categoryName === 'Puzzle'; }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadProduct(id);
    });
  }

  loadProduct(id: number) {
    this.loading = true;
    this.error = false;
    this.product = null;
    this.relatedProducts = [];
    this.selectedImageIndex = 0;

    this.productService.getById(id).subscribe({
      next: data => {
        this.product = data;
        this.loading = false;
        this.loadRelated(data);
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadRelated(product: Product) {
    this.productService.getFiltered({ categoryId: product.categoryId }).subscribe({
      next: data => {
        this.relatedProducts = data
          .filter(p => p.productId !== product.productId)
          .slice(0, 4);
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  addToCart() {
    if (!this.authService.isLoggedIn()) {
      this.authModalService.openLogin();
      return;
    }
    this.cartError = '';
    this.cartService.addToCart({
      productId: this.product!.productId,
      quantity: 1
    }).subscribe({
      next: () => {
        this.addedToCart = true;
        this.cartError = '';
        this.cdr.detectChanges();
        setTimeout(() => {
          this.addedToCart = false;
          this.cdr.detectChanges();
        }, 2000);
      },
      error: (err: Error) => {
        this.cartError = err.message;
        this.cdr.detectChanges();
      }
    });
  }

  deleteProduct() {
    if (!this.product) return;
    if (!confirm(`¿Eliminar "${this.product.name}" del catálogo?`)) return;
    this.adminProductService.deleteProduct(this.product.productId).subscribe({
      next: () => this.router.navigate(['/catalog'])
    });
  }

  goBack() {
    history.back();
  }
}