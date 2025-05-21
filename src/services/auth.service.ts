import fs from "fs";
import path from "path";
import { UserRepository } from "@app/repositories";
import { AuthError, hashPassword } from "@app/utils";
import { generateNumericOTP } from "@app/utils";
import { EmailService } from "./email.service";
import { UserOtpRepository } from "@app/repositories/userOtp.repository";

export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private emailService: EmailService,
    private userOtpRepo: UserOtpRepository
  ) {}

  async register({ email, password }: { email: string; password: string }) {
    const existingUser = await this.userRepo.findByEmail(email);

    if (existingUser) throw new Error("User already exists");

    // hash password
    const hashedPassword = await hashPassword(password);

    return await this.userRepo.create({ email, password: hashedPassword });
  }

  async generateOtpForLogin(email: string) {
    try {
      const existingUser = await this.userRepo.findByEmail(email);
      if (!existingUser) {
        throw new AuthError("Invalid credentials");
      }

      // generate numeric otp
      const otp = generateNumericOTP(6);

      // store otp into database
      await this.userOtpRepo.create({
        email: existingUser.email,
        otp,
        expiresAt: Date.now() + 2 * 60 * 1000,
      });

      // send otp user email
      const loginOtpEmailTemplate = fs
        .readFileSync(
          path.join(__dirname, "../templates/loginOtp.template.html"),
          "utf-8"
        )
        .replace("{{OTP}}", otp)
        .replace("{{YEAR}}", new Date().getFullYear().toString());
      const subject = "Smart Login System - Login OTP";
      this.emailService.sendEmail({
        to: existingUser.email,
        html: loginOtpEmailTemplate,
        subject,
      });
    } catch (error) {
      throw error;
    }
  }
}
