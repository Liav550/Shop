import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../connection";
import { Product } from "../entities/Product";

const productsRepository = AppDataSource.getRepository(Product);

@Injectable()
export class ProductsService {
  getAllProducts() {
    return productsRepository.find();
  }
}
