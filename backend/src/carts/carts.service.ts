import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../connection";
import { Order } from "../entities/Order";
import { S3Handler } from "../aws/s3hander";
import { OrderItem } from "../entities/OrderItem";

const ordersRepository = AppDataSource.getRepository(Order);
const orderItemsRepository = AppDataSource.getRepository(OrderItem);

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

  async addProductToCart(cartId: number, productId: number) {
    const newOrderItem = { orderId: cartId, productId };

    return await orderItemsRepository.save(newOrderItem);
  }

  async removeProductFromCart(cartId: number, productId: number) {
    const elementToRemove = await AppDataSource.createQueryBuilder()
      .delete()
      .from(OrderItem)
      .where("orderId = :cartId", { cartId })
      .andWhere("productId = :productId", { productId })
      .execute();

    if (elementToRemove.affected === 0) {
      throw new Error("Not affected");
    }

    return { status: "Deleted" };
  }
}
