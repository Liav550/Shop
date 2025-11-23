import { Module } from "@nestjs/common";
import { LoginModule } from "./login/login.module";
import { ProductsModule } from "./products/products.module";
@Module({
  imports: [LoginModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
