export interface OrderLine {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  orderId: number;
  userName: string;
  orderDate: string;
  status: number;
  total: number;
  lines: OrderLine[];
}