export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "canceled";
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  role: "user" | "admin";
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  total: number;
}
