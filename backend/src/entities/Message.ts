import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("messages")
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: number;

  @Column()
  to: number;

  @ManyToOne(() => User, (user: User) => user.messagesSent)
  @JoinColumn({ name: "from" })
  fromUser: User;

  @ManyToOne(() => User, (user: User) => user.messagesRecieved)
  @JoinColumn({ name: "to" })
  toUser: User;

  @Column()
  content: string;

  @Column({ name: "sent_at" })
  sentAt: Date;
}
