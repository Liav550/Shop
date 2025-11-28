import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";
import { Message } from "./Message";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: "provider_id" })
  providerId: string;

  @Column()
  provider: "local" | "google";

  @Column()
  role: string;

  @OneToMany(() => Order, (order: Order) => order.user)
  orders: Order[];

  @OneToMany(() => Message, (message: Message) => message.fromUser)
  messagesSent: Message[];

  @OneToMany(() => Message, (message: Message) => message.toUser)
  messagesRecieved: Message[];
}
