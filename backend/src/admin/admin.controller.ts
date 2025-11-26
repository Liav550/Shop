import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AdminGuard } from "./admin.guard";
import { AuthGuard } from "../login/auth.guard";
import { AdminService } from "./admin.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { NewProductDTO } from "../utils/types";

@Controller("admin")
@UseGuards(AuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("admins/count")
  getAdminCount() {
    return this.adminService.getAdminCount();
  }

  @Get("users/count")
  getUsersCount() {
    return this.adminService.getUsersCount();
  }

  @Get("products/count")
  getProductsCount() {
    return this.adminService.getProductsCount();
  }

  @Get("orders/count")
  getOrdersCount() {
    return this.adminService.getOrdersCount();
  }

  @Post("products")
  @UseInterceptors(FileInterceptor("file"))
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: NewProductDTO
  ) {
    return this.adminService.createProduct(file, body);
  }

  @Delete("products/:id")
  deleteProduct(@Param("id") id: number) {
    return this.adminService.deleteProduct(id);
  }

  @Get("orders")
  getAllOrders() {
    return this.adminService.getAllOrders();
  }
}
