import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Product } from "./entities/Product";
import { Order } from "./entities/Order";
import { OrderItem } from "./entities/OrderItem";
import { Message } from "./entities/Message";

export const AppDataSource = new DataSource({
  type: "postgres", // Change to your DB type (mysql, sqlite, etc.)
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  schema: "shop",
  synchronize: false, // Set to false in production
  logging: false,
  entities: [User, Product, Order, OrderItem, Message],
});

export async function connectDB() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}
