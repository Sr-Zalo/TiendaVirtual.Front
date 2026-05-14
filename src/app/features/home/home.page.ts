import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

interface Slide {
  name: string;
  description: string;
  price: number;
  id: number;
  imageUrl: string | null;
}

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

  slides: Slide[] = [];
  featured: Product[] = [];
  newProducts: Product[] = [];
  bestsellers: Product[] = [];

  getMainImage(product: Product): string | null {
    if (!product.images?.length) return null;
    return product.images.find(i => i.isMain)?.url ?? product.images[0].url;
  }

  ngOnInit() {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % (this.slides.length || 1);
      this.cdr.detectChanges();
    }, 4000);

    // Cargar los 3 productos del carrusel por ID real
    const carouselIds = [2, 3, 4]; // Catan, Wingspan, Gloomhaven
    const tempSlides: Slide[] = new Array(3);
    let carouselLoaded = 0;

    carouselIds.forEach((id, index) => {
      this.productService.getById(id).subscribe({
        next: product => {
          tempSlides[index] = {
            name: product.name,
            description: product.description ?? '',
            price: product.price,
            id: product.productId,
            imageUrl: this.getMainImage(product)
          };
          carouselLoaded++;
          if (carouselLoaded === carouselIds.length) {
            this.slides = tempSlides;
            this.cdr.detectChanges();
          }
        },
        error: () => { carouselLoaded++; }
      });
    });

    // Cargar el resto de productos
    this.productService.getFiltered({}).subscribe({
      next: products => {
        this.newProducts = [...products]
          .sort((a, b) => b.productId - a.productId)
          .slice(0, 5);

        this.bestsellers = [...products]
          .sort((a, b) => a.productId - b.productId)
          .slice(0, 5);

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