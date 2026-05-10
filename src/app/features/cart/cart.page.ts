import { Component, OnInit, inject, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { CartItem } from '../../core/models/cart.model';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslocoModule],
  templateUrl: './cart.page.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  get totalItems() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
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

  increaseQuantity(item: CartItem) {
    const newQty = item.quantity + 1;
    this.cartService.updateQuantity(item.cartId, newQty).subscribe({
      next: () => {
        item.quantity = newQty;
        item.subtotal = item.price * newQty;
        this.cdr.detectChanges();
      }
    });
  }

  decreaseQuantity(item: CartItem) {
    const newQty = item.quantity - 1;
    if (newQty <= 0) {
      this.removeItem(item.cartId);
      return;
    }
    this.cartService.updateQuantity(item.cartId, newQty).subscribe({
      next: () => {
        item.quantity = newQty;
        item.subtotal = item.price * newQty;
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

  goBack() {
    history.back();
  }
}