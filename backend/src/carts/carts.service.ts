import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../connection";
import { Order } from "../entities/Order";
import { S3Handler } from "../aws/s3hander";
import { OrderItem } from "../entities/OrderItem";
import { CartDTO } from "../utils/types";

const ordersRepository = AppDataSource.getRepository(Order);
const orderItemsRepository = AppDataSource.getRepository(OrderItem);

@Injectable()
export class CartsService {
  constructor(private readonly s3handler: S3Handler) {}

  async getCurrentUserCart(userId: number) {
    const order = await ordersRepository
      .createQueryBuilder("order")
      .innerJoin("order.user", "user")
      .leftJoinAndSelect("order.orderItems", "items")
      .leftJoinAndSelect("items.product", "product")
      .where("user.id = :userId", { userId })
      .andWhere("order.status = :status", { status: "ORDERING" })
      .getOne();

    if (!order) {
      const newCartId = (await this.createNewCart(userId)).id;

      return { id: newCartId, orderItems: null };
    }

    if (!order.orderItems || order.orderItems.length === 0) {
      return { id: order.id, orderItems: null } as unknown as CartDTO;
    }

    const cart: CartDTO = {
      id: order.id,
      orderItems: [],
    };

    for (const item of order.orderItems) {
      const product = item.product;
      if (product && product.image) {
        try {
          const url = await this.s3handler.getImageUrl(product.image);
          product.image = url;
        } catch (err) {
          console.error("Failed to fetch product image URL:", err);
        }
      }

      cart.orderItems.push({ amount: item.amount, product });
    }

    return cart;
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

  async changeProductQuantity(
    cartId: number,
    productId: number,
    amount: number
  ) {
    const chosenOrderItem = await orderItemsRepository.findOne({
      where: { orderId: cartId, productId },
    });

    if (amount !== chosenOrderItem.amount) {
      chosenOrderItem.amount = amount;
    }

    return await orderItemsRepository.save(chosenOrderItem);
  }

  async order(cartId: number) {
    const cart = await ordersRepository.findOne({ where: { id: cartId } });

    cart.status = "PENDING";
    cart.orderedAt = new Date();

    await ordersRepository.save(cart);
  }

  private async createNewCart(userId: number): Promise<Order> {
    const cart = { userId };

    return ordersRepository.save(cart);
  }
}
