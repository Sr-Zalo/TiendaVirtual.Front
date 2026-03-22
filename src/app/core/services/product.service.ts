import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private api: ApiService) {}

  getAll() {
    return this.api.get<Product[]>('product');
  }

  getById(id: number) {
    return this.api.getById<Product>('product', id);
  }

  getByCategory(categoryId: number) {
    return this.api.get<Product[]>(`product/category/${categoryId}`);
  }
}