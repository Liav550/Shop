import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../connection";
import { Order } from "../entities/Order";
import { S3Handler } from "../s3hander";

const ordersRepository = AppDataSource.getRepository(Order);

@Injectable()
export class CartsService {
  constructor(private readonly s3handler: S3Handler) {}

  async getCurrentUserCart(userId) {
    const currentCart = await ordersRepository
      .createQueryBuilder("order")
      .innerJoin("order.user", "user")
      .innerJoinAndSelect("order.orderItems", "items")
      .innerJoinAndSelect("items.product", "product")
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      .where("user.id = :userId", { userId })
      .andWhere("order.status = :status", { status: "ORDERING" })
      .select(["order.id", "items.amount", "product"])
      .getOne();

    for (const item of currentCart.orderItems) {
      const url = await this.s3handler.getImageUrl(item.product.image);

      item.product.image = url;
    }

    return currentCart;
  }
}
