import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { CartItem } from '../../core/models/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.page.html'
})
export class CartPage implements OnInit {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  items: CartItem[] = [];
  loading = true;
  checkingOut = false;
  error = '';

  get total() {
    return this.items.reduce((acc, item) => acc + item.subtotal, 0);
  }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getMyCart().subscribe({
      next: data => {
        this.items = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  removeItem(cartId: number) {
    this.cartService.removeItem(cartId).subscribe({
      next: () => {
        this.items = this.items.filter(i => i.cartId !== cartId);
        this.cdr.detectChanges();
      }
    });
  }

  checkout() {
    this.checkingOut = true;
    this.orderService.checkout().subscribe({
      next: order => {
        this.router.navigate(['/orders', order.orderId]);
      },
      error: () => {
        this.error = 'Error al procesar el pedido';
        this.checkingOut = false;
        this.cdr.detectChanges();
      }
    });
  }
}