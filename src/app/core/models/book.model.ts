export interface Book {
  productId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryName: string;
  author?: string;
  publisher?: string;
  isbn?: string;
  pages?: number;
  language?: string;
}

export interface CreateBook {
  categoryId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  author?: string;
  publisher?: string;
  isbn?: string;
  pages?: number;
  language?: string;
}

export interface UpdateBook {
  categoryId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  author?: string;
  publisher?: string;
  isbn?: string;
  pages?: number;
  language?: string;
}