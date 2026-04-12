export interface Collectible {
  productId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryName: string;
  type?: string;
  material?: string;
  limitedEdition: boolean;
  size?: string;
  reference?: string;
}

export interface CreateCollectible {
  categoryId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  type?: string;
  material?: string;
  limitedEdition: boolean;
  size?: string;
  reference?: string;
}

export interface UpdateCollectible {
  categoryId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  type?: string;
  material?: string;
  limitedEdition: boolean;
  size?: string;
  reference?: string;
}