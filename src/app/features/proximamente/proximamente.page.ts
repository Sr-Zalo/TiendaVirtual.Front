import { Component, OnInit, inject, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
    selector: 'app-proximamente',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslocoModule],
    templateUrl: './proximamente.page.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProximamentePage implements OnInit {
    private productService = inject(ProductService);
    private cdr = inject(ChangeDetectorRef);
    private translocoService = inject(TranslocoService);

    products: Product[] = [];
    loading = true;

    readonly categoryKeys: Record<string, string> = {
        'Juego de mesa': 'categories.boardGame',
        'Videojuego': 'categories.videoGame',
        'Libro': 'categories.book',
        'Coleccionable': 'categories.collectible',
        'Puzzle': 'categories.puzzle'
    };

    getCategoryKey(name: string): string {
        return this.categoryKeys[name] ?? name;
    }

    ngOnInit() {
        this.productService.getFiltered({ outOfStock: true }).subscribe({
            next: data => {
                this.products = data;
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