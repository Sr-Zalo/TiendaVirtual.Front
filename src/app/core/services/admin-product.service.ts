import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class AdminProductService {
  private readonly baseUrl = `${environment.apiUrl}/api`;

  constructor(private api: ApiService, private http: HttpClient) { }

  deleteProduct(id: number) {
    return this.api.delete('product', id);
  }

  updateProduct(id: number, dto: any) {
    return this.api.put<void>(`product/${id}`, dto);
  }

  updateBoardGame(id: number, dto: any) {
    return this.api.put<void>(`boardgame/${id}`, dto);
  }

  updateVideoGame(id: number, dto: any) {
    return this.api.put<void>(`videogame/${id}`, dto);
  }

  updateBook(id: number, dto: any) {
    return this.api.put<void>(`book/${id}`, dto);
  }

  updateCollectible(id: number, dto: any) {
    return this.api.put<void>(`collectible/${id}`, dto);
  }

  updatePuzzle(id: number, dto: any) {
    return this.api.put<void>(`puzzle/${id}`, dto);
  }

  updateSubtype(subtype: string, id: number, dto: any) {
    return this.api.put<void>(`${subtype}/${id}`, dto);
  }
}