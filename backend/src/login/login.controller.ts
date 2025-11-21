import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from "@nestjs/common";
import { LoginService } from "./login.service";
import { AuthGuard } from "./auth.guard";

@Controller("login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() body: { email: string; password: string }) {
    return this.loginService.login(body.email, body.password);
  }

  @UseGuards(AuthGuard)
  @Get("/me")
  me(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    return { user: req.user };
  }
}
