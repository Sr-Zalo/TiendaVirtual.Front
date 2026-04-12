import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AddToCartRequest, CartItem } from '../models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
    constructor(private api: ApiService) { }

    getMyCart() {
        return this.api.get<CartItem[]>('cart');
    }

    addToCart(dto: AddToCartRequest) {
        return this.api.post<void>('cart', dto);
    }

    removeItem(cartId: number) {
        return this.api.delete('cart', cartId);
    }

    clearCart() {
        return this.api.deleteAll('cart');
    }
}