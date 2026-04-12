import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-form.page.html'
})
export class ProductFormPage implements OnInit {
  private api = inject(ApiService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  categories: Category[] = [];
  loading = false;
  error = '';
  isEdit = false;

  form = {
    categoryId: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    minPlayers: null as number | null,
    maxPlayers: null as number | null,
    avgDuration: null as number | null,
    minAge: null as number | null,
    type: '',
    platform: '',
    developer: '',
    pegi: null as number | null,
    author: '',
    publisher: '',
    isbn: '',
    pages: null as number | null,
    language: '',
    collectibleType: '',
    material: '',
    limitedEdition: false,
    size: '',
    reference: '',
    pieces: null as number | null,
    difficulty: '',
    shape: '',
    creator: '',
    dimensions: ''
  };

  get selectedCategory(): Category | undefined {
    return this.categories.find(c => c.categoryId === Number(this.form.categoryId));
  }

  get isBoardGame(): boolean {
    return this.selectedCategory?.name === 'Juego de mesa';
  }

  get isVideoGame(): boolean {
    return this.selectedCategory?.name === 'Videojuego';
  }

  get isBook(): boolean {
    return this.selectedCategory?.name === 'Libro';
  }

  get isCollectible(): boolean {
    return this.selectedCategory?.name === 'Coleccionable';
  }

  get isPuzzle(): boolean {
    return this.selectedCategory?.name === 'Puzzle';
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!id;

    this.categoryService.getAll().subscribe({
      next: data => {
        this.categories = data;
        this.cdr.detectChanges();
      }
    });
  }

  getEndpoint(): string {
    const name = this.selectedCategory?.name;
    if (name === 'Juego de mesa') return 'boardgame';
    if (name === 'Videojuego') return 'videogame';
    if (name === 'Libro') return 'book';
    if (name === 'Coleccionable') return 'collectible';
    if (name === 'Puzzle') return 'puzzle';
    return 'product';
  }

  buildDto(): any {
    const base = {
      categoryId: Number(this.form.categoryId),
      name: this.form.name,
      description: this.form.description,
      price: this.form.price,
      stock: this.form.stock
    };

    if (this.isBoardGame) return { ...base, minPlayers: this.form.minPlayers, maxPlayers: this.form.maxPlayers, avgDuration: this.form.avgDuration, minAge: this.form.minAge, type: this.form.type };
    if (this.isVideoGame) return { ...base, platform: this.form.platform, developer: this.form.developer, pegi: this.form.pegi };
    if (this.isBook) return { ...base, author: this.form.author, publisher: this.form.publisher, isbn: this.form.isbn, pages: this.form.pages, language: this.form.language };
    if (this.isCollectible) return { ...base, type: this.form.collectibleType, material: this.form.material, limitedEdition: this.form.limitedEdition, size: this.form.size, reference: this.form.reference };
    if (this.isPuzzle) return { ...base, pieces: this.form.pieces, difficulty: this.form.difficulty, shape: this.form.shape, material: this.form.material, minAge: this.form.minAge, creator: this.form.creator, dimensions: this.form.dimensions };

    return base;
  }

  submit() {
    this.loading = true;
    this.error = '';
    const endpoint = this.getEndpoint();
    const dto = this.buildDto();

    this.api.post<void>(endpoint, dto).subscribe({
      next: () => this.router.navigate(['/catalog']),
      error: () => {
        this.error = 'Error al guardar el producto';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}