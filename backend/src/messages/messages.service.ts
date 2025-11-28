import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../connection";
import { Message } from "../entities/Message";

const messagesRepository = AppDataSource.getRepository(Message);
@Injectable()
export class MessagesService {
  async getUserMessages(userId: number) {
    return messagesRepository.find({
      where: [{ from: userId }, { to: userId }],
    });
  }
}
