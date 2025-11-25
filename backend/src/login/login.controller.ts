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
import { GoogleLoginProps, LocalLoginProps } from "../utils/types";

@Controller("login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() body: LocalLoginProps | GoogleLoginProps) {
    return this.loginService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get("/me")
  me(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    return { user: req.user };
  }

  @Post("/register")
  async register(@Body() body: LocalLoginProps) {
    const { email, password } = body;
    return this.loginService.createNewUser(email, password);
  }
}
