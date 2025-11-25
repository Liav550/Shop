import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../connection";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Order } from "../entities/Order";
import { S3Handler } from "../aws/s3hander";
import { NewProductDTO } from "../utils/types";

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
}
