import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-list.page.html'
})
export class OrderListPage implements OnInit {
  private orderService = inject(OrderService);
  private cdr = inject(ChangeDetectorRef);

  orders: Order[] = [];
  loading = true;

  readonly statusLabels: Record<number, string> = {
    0: 'Pendiente',
    1: 'Enviado',
    2: 'Entregado',
    3: 'Cancelado'
  };

  readonly statusColors: Record<number, string> = {
    0: 'bg-yellow-100 text-yellow-700',
    1: 'bg-blue-100 text-blue-700',
    2: 'bg-green-100 text-green-700',
    3: 'bg-red-100 text-red-700'
  };

  ngOnInit() {
    this.orderService.getMyOrders().subscribe({
      next: data => {
        this.orders = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}