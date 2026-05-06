import { Component, OnInit, inject, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
    selector: 'app-proximamente',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './proximamente.page.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProximamentePage implements OnInit {
    private productService = inject(ProductService);
    private cdr = inject(ChangeDetectorRef);

    products: Product[] = [];
    loading = true;

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