import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../connection";
import { Product } from "../entities/Product";
import { S3Handler } from "../s3hander";

const productsRepository = AppDataSource.getRepository(Product);

@Injectable()
export class ProductsService {
  constructor(private readonly s3handler: S3Handler) {}

  async getAllProducts() {
    const products = await productsRepository.find();

    for (const product of products) {
      const url = await this.s3handler.getImageUrl(product.image);

      product.image = url;
    }

    return products;
  }

  async createProduct(file: Express.Multer.File) {
    return this.s3handler.uploadImage(file);
  }
}
