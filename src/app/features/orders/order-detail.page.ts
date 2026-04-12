import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order.model';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-detail.page.html'
})
export class OrderDetailPage implements OnInit {
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  order: Order | null = null;
  loading = true;
  error = false;

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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getById(id).subscribe({
      next: data => {
        this.order = data;
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
}