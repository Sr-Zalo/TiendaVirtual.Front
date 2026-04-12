export interface CartItem {
  cartId: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}