import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../connection";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Order } from "../entities/Order";

const usersRepository = AppDataSource.getRepository(User);
const productsRepository = AppDataSource.getRepository(Product);
const ordersRepository = AppDataSource.getRepository(Order);

@Injectable()
export class AdminService {
  async getAdminCount(): Promise<number> {
    return usersRepository.countBy({ role: "admin" });
  }

  async getUsersCount(): Promise<number> {
    return usersRepository.count();
  }

  async getProductsCount(): Promise<number> {
    return productsRepository.count();
  }

  async getOrdersCount(): Promise<number> {
    return ordersRepository.count();
  }
}
