import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../connection";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Order } from "../entities/Order";
import { S3Handler } from "../aws/s3hander";
import { NewProductDTO } from "../utils/types";
import { Not } from "typeorm";

const usersRepository = AppDataSource.getRepository(User);
const productsRepository = AppDataSource.getRepository(Product);
const ordersRepository = AppDataSource.getRepository(Order);

@Injectable()
export class AdminService {
  constructor(private readonly s3handler: S3Handler) {}

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

  async createProduct(file: Express.Multer.File, body: NewProductDTO) {
    const imageName = await this.s3handler.uploadImage(file);

    const newProduct = productsRepository.create({
      name: body.name,
      description: body.description,
      price: body.price,
      image: imageName,
    });

    await productsRepository.save(newProduct);
  }

  async deleteProduct(id: number) {
    const product = await productsRepository.findOneBy({ id });

    if (product) {
      product.exists = false;
      await productsRepository.save(product);
    }

    return { message: "Product deleted successfully" };
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await ordersRepository.find({
      where: { status: Not("ORDERING") },
      relations: ["orderItems", "orderItems.product", "user"],
      select: {
        id: true,
        status: true,
        orderedAt: true,
        user: {
          email: true,
        },
        orderItems: {
          amount: true,
          product: {
            id: true,
            name: true,
            price: true,
            image: true,
          },
        },
      },
    });

    for (const order of orders) {
      for (const item of order.orderItems) {
        if (item.product) {
          item.product.image = await this.s3handler.getImageUrl(
            item.product.image
          );
        }
      }
    }

    return orders;
  }
}
