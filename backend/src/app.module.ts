import { Module } from "@nestjs/common";
import { LoginModule } from "./login/login.module";
import { ProductsModule } from "./products/products.module";
import { CartsModule } from './carts/carts.module';
import { AdminModule } from './admin/admin.module';
import { MessagesModule } from './messages/messages.module';
@Module({
  imports: [LoginModule, ProductsModule, CartsModule, AdminModule, MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
