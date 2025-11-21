import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AppDataSource } from "../connection";
import { User } from "../entities/User";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

@Injectable()
export class LoginService {
  async login(email: string, password: string) {
    const usersRepository = AppDataSource.getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid: boolean = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const token = sign({ id: user.id, email: user.email }, process.env.SECRET);

    return { token };
  }
}
