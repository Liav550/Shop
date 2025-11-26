import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../connection";
import { Product } from "../entities/Product";
import { S3Handler } from "../aws/s3hander";

const productsRepository = AppDataSource.getRepository(Product);

@Injectable()
export class ProductsService {
  constructor(private readonly s3handler: S3Handler) {}

  async getAllProducts() {
    const products = await productsRepository.find({ where: { exists: true } });

    for (const product of products) {
      const url = await this.s3handler.getImageUrl(product.image);

      product.image = url;
    }

    return products;
  }
}
