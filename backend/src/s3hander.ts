/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import {
  ACCESS_KEY,
  BUCKET_NAME,
  BUCKET_REGION,
  SECRET_ACCESS_KEY,
} from "./utils/consts";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: BUCKET_REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

@Injectable()
export class S3Handler {
  async uploadImage(file: Express.Multer.File) {
    const params = {
      Bucket: BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);

    return await s3.send(command);
  }

  async getImageUrl(key: string) {
    const getObjectParams = {
      Bucket: BUCKET_NAME,
      Key: key,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return url;
  }
}
