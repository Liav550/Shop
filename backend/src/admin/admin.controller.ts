import { Controller, Get, UseGuards } from "@nestjs/common";
import { AdminGuard } from "./admin.guard";
import { AuthGuard } from "../login/auth.guard";
import { AdminService } from "./admin.service";

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
}
