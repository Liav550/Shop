import { Module } from "@nestjs/common";
import { LoginModule } from "./login/login.module";
import { ProductsModule } from "./products/products.module";
import { CartsModule } from './carts/carts.module';
@Module({
  imports: [LoginModule, ProductsModule, CartsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
