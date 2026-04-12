import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { Product } from '../../core/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.page.html'
})
export class ProductDetailPage implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  product: Product | null = null;
  loading = true;
  error = false;
  addedToCart = false;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getById(id).subscribe({
      next: data => {
        this.product = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  addToCart() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart({
      productId: this.product!.productId,
      quantity: 1
    }).subscribe({
      next: () => {
        this.addedToCart = true;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.addedToCart = false;
          this.cdr.detectChanges();
        }, 2000);
      }
    });
  }
}