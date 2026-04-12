export interface BoardGame {
  productId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryName: string;
  minPlayers?: number;
  maxPlayers?: number;
  avgDuration?: number;
  minAge?: number;
  type?: string;
}

export interface CreateBoardGame {
  categoryId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  minPlayers?: number;
  maxPlayers?: number;
  avgDuration?: number;
  minAge?: number;
  type?: string;
}

export interface UpdateBoardGame {
  categoryId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  minPlayers?: number;
  maxPlayers?: number;
  avgDuration?: number;
  minAge?: number;
  type?: string;
}