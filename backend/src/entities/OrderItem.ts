import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity("order_items")
export class OrderItem {
  @PrimaryColumn({ name: "product_id" })
  productId: number;

  @PrimaryColumn({ name: "order_id" })
  orderId: number;

  @ManyToOne(() => Product, (product: Product) => product.productOrders)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => Order, (order: Order) => order.orderItems)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column({ default: 1 })
  amount: number;
}
