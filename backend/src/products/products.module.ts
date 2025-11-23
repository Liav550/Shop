import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { AwsModule } from "../aws/aws.module";

@Module({
  imports: [AwsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
