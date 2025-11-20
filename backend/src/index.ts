import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { connectDB } from "./connection";
import { config } from "dotenv";

config();
async function bootstrap() {
  try {
    await connectDB();
  } catch (err) {
    console.error("Unable to connect to database, exiting.", err);
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  });
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
