import {
  DeleteObjectCommand,
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
} from "../utils/consts";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomBytes } from "crypto";

const s3 = new S3Client({
  region: BUCKET_REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

@Injectable()
export class S3Handler {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const newName = randomBytes(32).toString("hex");
    const params = {
      Bucket: BUCKET_NAME,
      Key: newName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);

    return newName;
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

  async deleteImage(key: string) {
    const deleteParams = {
      Bucket: BUCKET_NAME,
      Key: key,
    };
    const command = new DeleteObjectCommand(deleteParams);

    await s3.send(command);
  }
}
