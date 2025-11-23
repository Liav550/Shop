import { Module } from "@nestjs/common";
import { CartsController } from "./carts.controller";
import { CartsService } from "./carts.service";
import { AwsModule } from "../aws/aws.module";

@Module({
  imports: [AwsModule],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
