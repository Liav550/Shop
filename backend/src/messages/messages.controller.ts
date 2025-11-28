import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../login/auth.guard";
import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(":userId")
  @UseGuards(AuthGuard)
  getUserMessages(@Param("userId") userId: number) {
    return this.messagesService.getUserMessages(userId);
  }
}
