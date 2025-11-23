import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";
import { User } from "./User";
import { OrderStatus } from "../utils/types";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user: User) => user.orders)
  user: User;

  @Column({ name: "ordered_at" })
  orderedAt: Timestamp;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.ORDERING })
  status: OrderStatus;
}
