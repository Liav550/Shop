import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./OrderItem";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column("numeric", { precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => OrderItem, (orderItem: OrderItem) => orderItem.product)
  productOrders: OrderItem[];
}
