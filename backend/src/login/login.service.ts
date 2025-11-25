import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AppDataSource } from "../connection";
import { User } from "../entities/User";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { GoogleLoginProps, LocalLoginProps } from "../utils/types";

const usersRepository = AppDataSource.getRepository(User);

@Injectable()
export class LoginService {
  async login(body: LocalLoginProps | GoogleLoginProps) {
    const { email } = body;

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      if (!("sub" in body)) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const newSub = await hash(body.sub, 10);

      const newUser = usersRepository.create({
        email,
        password: null,
        provider: "google",
        providerId: newSub,
        role: "user",
      });

      await usersRepository.save(newUser);

      const token = sign(
        { id: newUser.id, email: newUser.email },
        process.env.SECRET
      );

      return { token };
    }

    if ("password" in body) {
      const isPasswordValid: boolean = await compare(
        body.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid credentials");
      }
    }

    // @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const token = sign({ id: user.id, email: user.email }, process.env.SECRET);

    return { token };
  }

  async createNewUser(email: string, password: string) {
    const existingUser = await usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await hash(password, 10);

    const newUser = usersRepository.create({
      email,
      password: hashedPassword,
      role: "user",
    });

    await usersRepository.save(newUser);

    return { id: newUser.id, email: newUser.email };
  }
}
