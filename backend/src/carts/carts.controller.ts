import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CartsService } from "./carts.service";
import { AuthGuard } from "../login/auth.guard";

@Controller("carts")
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get(":userId")
  getCurrentUserCart(@Param("userId") userId: number) {
    return this.cartsService.getCurrentUserCart(userId);
  }

  @Get(":userId/all")
  @UseGuards(AuthGuard)
  getAllUserCarts(@Param("userId") userId: number) {
    return this.cartsService.getAllUserCarts(userId);
  }

  @Post(":cartId/add")
  addProductToCart(
    @Body() body: { productId: number },
    @Param("cartId") cartId: number
  ) {
    return this.cartsService.addProductToCart(cartId, body.productId);
  }

  @Delete(":cartId/remove")
  removeProductFromCart(
    @Body() body: { productId: number },
    @Param("cartId") cartId: number
  ) {
    return this.cartsService.removeProductFromCart(cartId, body.productId);
  }

  @Patch(":cartId/order")
  async order(@Param("cartId") cartId: number) {
    await this.cartsService.order(cartId);
  }

  @Patch(":cartId/:productId")
  changeProductQuantity(
    @Body() body: { amount: number },
    @Param("cartId") cartId: number,
    @Param("productId") productId: number
  ) {
    return this.cartsService.changeProductQuantity(
      cartId,
      productId,
      body.amount
    );
  }
}
