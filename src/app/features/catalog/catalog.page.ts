import { Component, OnInit, inject, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { AuthModalService } from '../../core/services/auth-modal.service';
import { CategoryService } from '../../core/services/category.service';
import { AdminProductService } from '../../core/services/admin-product.service';
import { Product, ProductFilterParams } from '../../core/models/product.model';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './catalog.page.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogPage implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private authModalService = inject(AuthModalService);
  private categoryService = inject(CategoryService);
  private adminProductService = inject(AdminProductService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  products: Product[] = [];
  categories: Category[] = [];
  loading = true;
  error = false;

  selectedCategoryId: number | null = null;
  selectedCategoryName: string = '';

  confirmProduct: Product | null = null;
  cartError = '';

  filters: ProductFilterParams = {};
  currentFilter = '';

  currentPage = 1;
  pageSize = 15;

  readonly filterLabels: Record<string, string> = {
    'new': 'Novedades',
    'soon': 'Próximamente',
    'best': 'Más vendidos',
    'recommended': 'Recomendados'
  };

  get isAdmin() { return this.authService.isAdmin(); }
  get isBoardGame() { return this.selectedCategoryName === 'Juego de mesa'; }
  get isVideoGame() { return this.selectedCategoryName === 'Videojuego'; }
  get isBook() { return this.selectedCategoryName === 'Libro'; }
  get isCollectible() { return this.selectedCategoryName === 'Coleccionable'; }
  get isPuzzle() { return this.selectedCategoryName === 'Puzzle'; }

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: data => {
        this.categories = data;
        this.cdr.detectChanges();
      }
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.filters = {};
      this.selectedCategoryId = null;
      this.selectedCategoryName = '';
      this.currentFilter = params['filter'] ?? '';

      if (params['q']) {
        this.filters.searchText = params['q'];
      }

      if (params['filter'] === 'new') {
        this.filters.newArrivals = true;
      } else if (params['filter'] === 'soon') {
        this.filters.outOfStock = true;
      } else if (params['filter'] === 'best') {
        this.filters.bestSellers = true;
      }

      this.loadProducts();
    });
  }

  loadProducts() {
    this.loading = true;
    this.error = false;

    const params: ProductFilterParams = { ...this.filters };
    if (this.selectedCategoryId) {
      params.categoryId = this.selectedCategoryId;
    }

    this.productService.getFiltered(params).subscribe({
      next: data => {
        this.products = data;
        this.currentPage = 1;
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

  selectCategory(categoryId: number | null, categoryName: string) {
    this.selectedCategoryId = categoryId;
    this.selectedCategoryName = categoryName;
    this.filters = {
      newArrivals: this.currentFilter === 'new' ? true : undefined,
      outOfStock: this.currentFilter === 'soon' ? true : undefined,
      bestSellers: this.currentFilter === 'best' ? true : undefined,
    };
    this.loadProducts();
  }

  applyFilters() {
    this.loadProducts();
  }

  resetFilters() {
    this.filters = {};
    if (this.currentFilter === 'new') this.filters.newArrivals = true;
    if (this.currentFilter === 'soon') this.filters.outOfStock = true;
    if (this.currentFilter === 'best') this.filters.bestSellers = true;
    this.loadProducts();
  }

  clearSearch() {
    this.filters.searchText = undefined;
    this.router.navigate(['/catalog']);
  }

  openConfirm(product: Product) {
    if (!this.authService.isLoggedIn()) {
      this.authModalService.openLogin();
      return;
    }
    this.cartError = '';
    this.confirmProduct = product;
  }

  closeConfirm() {
    this.confirmProduct = null;
    this.cartError = '';
  }

  confirmAddToCart() {
    if (!this.confirmProduct) return;
    this.cartService.addToCart({
      productId: this.confirmProduct.productId,
      quantity: 1
    }).subscribe({
      next: () => {
        this.confirmProduct = null;
        this.cartError = '';
        this.cdr.detectChanges();
      },
      error: (err: Error) => {
        this.cartError = err.message;
        this.cdr.detectChanges();
      }
    });
  }

  deleteProduct(product: Product, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (!confirm(`¿Eliminar "${product.name}" del catálogo?`)) return;
    this.adminProductService.deleteProduct(product.productId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.productId !== product.productId);
        this.cdr.detectChanges();
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.pageSize);
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.products.slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.cdr.detectChanges();
  }
}