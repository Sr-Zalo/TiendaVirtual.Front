export interface Puzzle {
  productId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryName: string;
  pieces?: number;
  difficulty?: string;
  shape?: string;
  material?: string;
  minAge?: number;
  creator?: string;
  dimensions?: string;
}

export interface CreatePuzzle {
  categoryId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  pieces?: number;
  difficulty?: string;
  shape?: string;
  material?: string;
  minAge?: number;
  creator?: string;
  dimensions?: string;
}

export interface UpdatePuzzle {
  categoryId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  pieces?: number;
  difficulty?: string;
  shape?: string;
  material?: string;
  minAge?: number;
  creator?: string;
  dimensions?: string;
}