export interface VideoGame {
  productId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryName: string;
  platform?: string;
  developer?: string;
  pegi?: number;
}

export interface CreateVideoGame {
  categoryId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  platform?: string;
  developer?: string;
  pegi?: number;
}

export interface UpdateVideoGame {
  categoryId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  platform?: string;
  developer?: string;
  pegi?: number;
}