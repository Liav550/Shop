import { Controller, Get, Param } from "@nestjs/common";
import { CartsService } from "./carts.service";

@Controller("carts")
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get(":userId")
  getCurrentUserCart(@Param("userId") userId) {
    return this.cartsService.getCurrentUserCart(userId);
  }
}
