import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { OrderStatus } from "../utils/types";
import { OrderItem } from "./OrderItem";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @ManyToOne(() => User, (user: User) => user.orders)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "ordered_at" })
  orderedAt: Date;

  @Column({ default: "ORDERING" })
  status: OrderStatus;

  @OneToMany(() => OrderItem, (orderItem: OrderItem) => orderItem.order)
  orderItems: OrderItem[];
}
