import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Order } from '../models/order.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private api: ApiService) {}

  getMyOrders() {
    return this.api.get<Order[]>('order/my');
  }

  getAll() {
    return this.api.get<Order[]>('order');
  }

  getById(id: number) {
    return this.api.getById<Order>('order', id);
  }

  checkout() {
    return this.api.post<Order>('order/checkout', {}).pipe(
      catchError((err: HttpErrorResponse) => {
        const message = typeof err.error === 'string' ? err.error : 'Error al procesar el pedido';
        return throwError(() => new Error(message));
      })
    );
  }
}