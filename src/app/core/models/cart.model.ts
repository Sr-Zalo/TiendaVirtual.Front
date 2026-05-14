export interface CartItem {
  cartId: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
   imageUrl?: string; 
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}