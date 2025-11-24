import { Module } from "@nestjs/common";
import { S3Handler } from "./s3hander";

@Module({
  providers: [S3Handler],
  exports: [S3Handler],
})
export class AwsModule {}
