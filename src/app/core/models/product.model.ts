export interface Product {
  productId: number;
  categoryId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryName: string;

  // BoardGame
  minPlayers?: number;
  maxPlayers?: number;
  avgDuration?: number;
  minAge?: number;
  boardGameType?: string;

  // VideoGame
  platform?: string;
  developer?: string;
  pegi?: number;

  // Book
  author?: string;
  publisher?: string;
  isbn?: string;
  pages?: number;
  language?: string;

  // Collectible
  collectibleType?: string;
  material?: string;
  limitedEdition?: boolean;
  size?: string;
  reference?: string;

  // Puzzle
  pieces?: number;
  difficulty?: string;
  shape?: string;
  creator?: string;
  dimensions?: string;

  images?: ProductImage[];
}

export interface ProductFilterParams {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  minPlayers?: number;
  maxPlayers?: number;
  avgDuration?: number;
  minAge?: number;
  type?: string;
  platform?: string;
  pegi?: number;
  language?: string;
  publisher?: string;
  collectibleType?: string;
  limitedEdition?: boolean;
  pieces?: number;
  difficulty?: string;
  searchText?: string;
  outOfStock?: boolean;
  newArrivals?: boolean;
  bestSellers?: boolean;
}

export interface ProductImage {
  productImageId: number;
  url: string;
  altText?: string;
  isMain: boolean;
  order: number;
}