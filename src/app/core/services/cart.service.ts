import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AddToCartRequest, CartItem } from '../models/cart.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private api: ApiService) {}

  getMyCart() {
    return this.api.get<CartItem[]>('cart');
  }

  addToCart(dto: AddToCartRequest) {
    return this.api.post<void>('cart', dto).pipe(
      catchError((err: HttpErrorResponse) => {
        const message = typeof err.error === 'string' ? err.error : 'Error al añadir al carrito';
        return throwError(() => new Error(message));
      })
    );
  }

  updateQuantity(cartId: number, quantity: number) {
    return this.api.put<void>(`cart/${cartId}`, { quantity });
  }

  removeItem(cartId: number) {
    return this.api.delete('cart', cartId);
  }

  clearCart() {
    return this.api.deleteAll('cart');
  }
}