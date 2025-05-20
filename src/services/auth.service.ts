import bcrypt from "bcrypt";
import { UserRepository } from "@app/repositories";
import { hashPassword } from "@app/utils";

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async register({ email, password }: { email: string; password: string }) {
    const existingUser = await this.userRepo.findByEmail(email);

    if (existingUser) throw new Error("User already exists");

    // hash password
    const hashedPassword = await hashPassword(password);

    return await this.userRepo.create({ email, password: hashedPassword });
  }
}
