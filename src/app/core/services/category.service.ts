import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private api: ApiService) {}

  getAll() {
    return this.api.get<Category[]>('category');
  }
}