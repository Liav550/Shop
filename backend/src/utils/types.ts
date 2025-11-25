import { Product } from "../entities/Product";

export type OrderStatus = "ORDERING" | "PENDING" | "DELIVERING" | "DELIVERED";

export interface CartDTO {
  id: number;
  orderItems: ProductItemDTO[];
}

export type LocalLoginProps = {
  email: string;
  password: string;
  provider: string;
};

export type GoogleLoginProps = {
  email: string;
  sub: string;
  provider: string;
};

export interface ProductItemDTO {
  amount: number;
  product: Product;
}

export interface NewProductDTO {
  name: string;
  description: string;
  price: number;
}
