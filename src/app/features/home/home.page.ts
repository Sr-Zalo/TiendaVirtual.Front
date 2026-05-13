import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslocoModule],
  templateUrl: './home.page.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  currentSlide = 0;
  private slideInterval: any;

  slides = [
    { name: 'Wingspan', description: 'Construye tu colección de aves', price: 54.99, id: 1 },
    { name: 'Catan', description: 'El clásico juego de estrategia y negociación', price: 49.99, id: 2 },
    { name: 'Gloomhaven', description: 'La aventura cooperativa más épica', price: 149.99, id: 3 }
  ];

  featured: Product[] = [];
  newProducts: Product[] = [];
  bestsellers: Product[] = [];

  ngOnInit() {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 4000);

    this.productService.getFiltered({}).subscribe({
      next: products => {
        // Novedades: últimos 5 añadidos (mayor ProductId)
        this.newProducts = [...products]
          .sort((a, b) => b.productId - a.productId)
          .slice(0, 5);

        // Más vendidos: los 5 primeros (simulado con los de menor ID, los más antiguos)
        this.bestsellers = [...products]
          .sort((a, b) => a.productId - b.productId)
          .slice(0, 5)
          .map((p, i) => ({ ...p, rank: i + 1 }));

        // Destacados: 5 aleatorios
        const shuffled = [...products].sort(() => Math.random() - 0.5);
        this.featured = shuffled.slice(0, 5);

        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.slideInterval);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}