import { Component, OnInit, inject, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/product.service';
import { AdminProductService } from '../../../core/services/admin-product.service';
import { Category } from '../../../core/models/category.model';
import { ProductImage } from '../../../core/models/product.model';
import { TranslocoModule } from '@jsverse/transloco';
import { environment } from '../../../core/environments/environment';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslocoModule],
  templateUrl: './product-form.page.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductFormPage implements OnInit {
  private api = inject(ApiService);
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private adminProductService = inject(AdminProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  categories: Category[] = [];
  loading = false;
  loadingProduct = false;
  error = '';
  isEdit = false;
  productId: number | null = null;

  // --- IMÁGENES ---
  images: ProductImage[] = [];
  uploadingImage = false;
  imageError = '';

  form = {
    categoryId: 0,
    name: '',
    description: '',
    price: 0,
    isRecommended: false,
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

  get isBoardGame(): boolean { return this.selectedCategory?.name === 'Juego de mesa'; }
  get isVideoGame(): boolean { return this.selectedCategory?.name === 'Videojuego'; }
  get isBook(): boolean { return this.selectedCategory?.name === 'Libro'; }
  get isCollectible(): boolean { return this.selectedCategory?.name === 'Coleccionable'; }
  get isPuzzle(): boolean { return this.selectedCategory?.name === 'Puzzle'; }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!id && id !== 'new';
    this.productId = this.isEdit ? Number(id) : null;

    this.categoryService.getAll().subscribe({
      next: data => {
        this.categories = data;
        if (this.isEdit && this.productId) {
          this.loadProduct(this.productId);
        }
        this.cdr.detectChanges();
      }
    });
  }

  loadProduct(id: number) {
    this.loadingProduct = true;
    this.productService.getById(id).subscribe({
      next: product => {
        const cat = this.categories.find(c => c.name === product.categoryName);
        this.form.categoryId = cat?.categoryId ?? 0;
        this.form.name = product.name;
        this.form.description = product.description ?? '';
        this.form.price = product.price;
        this.form.stock = product.stock;
        this.form.minPlayers = product.minPlayers ?? null;
        this.form.maxPlayers = product.maxPlayers ?? null;
        this.form.avgDuration = product.avgDuration ?? null;
        this.form.minAge = product.minAge ?? null;
        this.form.type = product.boardGameType ?? '';
        this.form.platform = product.platform ?? '';
        this.form.developer = product.developer ?? '';
        this.form.pegi = product.pegi ?? null;
        this.form.author = product.author ?? '';
        this.form.publisher = product.publisher ?? '';
        this.form.isbn = product.isbn ?? '';
        this.form.pages = product.pages ?? null;
        this.form.language = product.language ?? '';
        this.form.collectibleType = product.collectibleType ?? '';
        this.form.material = product.material ?? '';
        this.form.limitedEdition = product.limitedEdition ?? false;
        this.form.size = product.size ?? '';
        this.form.reference = product.reference ?? '';
        this.form.pieces = product.pieces ?? null;
        this.form.difficulty = product.difficulty ?? '';
        this.form.shape = product.shape ?? '';
        this.form.creator = product.creator ?? '';
        this.form.dimensions = product.dimensions ?? '';
        this.images = product.images ?? [];   // ← cargar imágenes
        this.loadingProduct = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al cargar el producto';
        this.loadingProduct = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ---- MÉTODOS DE IMÁGENES ----

  async uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length || !this.productId) return;

    const file = input.files[0];
    input.value = ''; // reset para poder subir la misma imagen de nuevo si hace falta

    if (this.images.length >= 4) {
      this.imageError = 'Máximo 4 imágenes por producto';
      return;
    }

    this.uploadingImage = true;
    this.imageError = '';
    this.cdr.detectChanges();

    try {
      // Subir a Cloudinary directamente con fetch (sin pasar por el auth interceptor)
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', environment.cloudinaryPreset);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${environment.cloudName}/image/upload`,
        { method: 'POST', body: formData }
      );

      if (!cloudRes.ok) throw new Error('Error al subir a Cloudinary');

      const cloudData = await cloudRes.json();
      const url: string = cloudData.secure_url;

      // Guardar la URL en el backend
      this.adminProductService.addImage(this.productId!, url, this.images.length === 0)
        .subscribe({
          next: (img) => {
            this.images.push(img);
            this.uploadingImage = false;
            this.cdr.detectChanges();
          },
          error: () => {
            this.imageError = 'Imagen subida a Cloudinary pero no se pudo guardar. Inténtalo de nuevo.';
            this.uploadingImage = false;
            this.cdr.detectChanges();
          }
        });
    } catch {
      this.imageError = 'Error al subir la imagen. Comprueba tu conexión.';
      this.uploadingImage = false;
      this.cdr.detectChanges();
    }
  }

  deleteImage(imageId: number) {
    this.adminProductService.deleteImage(imageId).subscribe({
      next: () => {
        this.images = this.images.filter(i => i.productImageId !== imageId);
        // Si se borró la principal y quedan imágenes, la primera pasa a serlo
        if (this.images.length > 0 && !this.images.some(i => i.isMain)) {
          this.images[0].isMain = true;
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.imageError = 'Error al eliminar la imagen';
        this.cdr.detectChanges();
      }
    });
  }

  setMain(imageId: number) {
    this.adminProductService.setMainImage(imageId).subscribe({
      next: () => {
        this.images.forEach(i => i.isMain = i.productImageId === imageId);
        this.cdr.detectChanges();
      }
    });
  }

  // ---- RESTO SIN CAMBIOS ----

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
      stock: this.form.stock,
      isRecommended: this.form.isRecommended
    };
    if (this.isBoardGame) return { ...base, minPlayers: this.form.minPlayers, maxPlayers: this.form.maxPlayers, avgDuration: this.form.avgDuration, minAge: this.form.minAge, type: this.form.type };
    if (this.isVideoGame) return { ...base, platform: this.form.platform, developer: this.form.developer, pegi: this.form.pegi };
    if (this.isBook) return { ...base, author: this.form.author, publisher: this.form.publisher, isbn: this.form.isbn, pages: this.form.pages, language: this.form.language };
    if (this.isCollectible) return { ...base, type: this.form.collectibleType, material: this.form.material, limitedEdition: this.form.limitedEdition, size: this.form.size, reference: this.form.reference };
    if (this.isPuzzle) return { ...base, pieces: this.form.pieces, difficulty: this.form.difficulty, shape: this.form.shape, material: this.form.material, minAge: this.form.minAge, creator: this.form.creator, dimensions: this.form.dimensions };
    return base;
  }

  submit() {
    if (!this.form.name.trim()) { this.error = 'El nombre es obligatorio'; return; }
    if (this.form.price <= 0) { this.error = 'El precio debe ser mayor que 0'; return; }
    if (this.form.stock < 0) { this.error = 'El stock no puede ser negativo'; return; }
    if (this.form.categoryId === 0) { this.error = 'Selecciona una categoría'; return; }

    this.loading = true;
    this.error = '';
    const dto = this.buildDto();

    if (this.isEdit && this.productId) {
      const endpoint = this.getEndpoint();
      const obs = endpoint === 'product'
        ? this.adminProductService.updateProduct(this.productId, dto)
        : this.adminProductService.updateSubtype(endpoint, this.productId, dto);

      obs.subscribe({
        next: () => this.router.navigate(['/product', this.productId]),
        error: () => { this.error = 'Error al guardar los cambios'; this.loading = false; this.cdr.detectChanges(); }
      });
    } else {
      this.api.post<void>(this.getEndpoint(), dto).subscribe({
        next: () => this.router.navigate(['/catalog']),
        error: () => { this.error = 'Error al crear el producto'; this.loading = false; this.cdr.detectChanges(); }
      });
    }
  }
}