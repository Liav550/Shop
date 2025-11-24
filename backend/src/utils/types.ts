import { Product } from "../entities/Product";

export type OrderStatus = "ORDERING" | "PENDING" | "DELIVERING" | "DELIVERED";

export interface CartDTO {
  id: number;
  orderItems: ProductItemDTO[];
}

export interface ProductItemDTO {
  amount: number;
  product: Product;
}
