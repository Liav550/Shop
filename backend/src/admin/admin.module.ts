import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AwsModule } from "../aws/aws.module";

@Module({
  imports: [AwsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
