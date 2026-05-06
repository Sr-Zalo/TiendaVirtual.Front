import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Product, ProductFilterParams } from '../models/product.model';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly baseUrl = `${environment.apiUrl}/api`;

  constructor(private api: ApiService, private http: HttpClient) {}

  getAll() {
    return this.api.get<Product[]>('product');
  }

  getById(id: number) {
    return this.api.getById<Product>('product', id);
  }

  getByCategory(categoryId: number) {
    return this.api.get<Product[]>(`product/category/${categoryId}`);
  }

  getFiltered(filters: ProductFilterParams): Observable<Product[]> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    return this.http.get<Product[]>(`${this.baseUrl}/product/filter`, { params });
  }
}