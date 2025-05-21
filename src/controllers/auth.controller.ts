import { Request, Response, NextFunction } from "express";
import { AuthService } from "@app/services";
import { RegisterUserSchema } from "@app/schemas";
import { successResponse } from "@app/utils";

export class AuthController {
  constructor(private authService: AuthService) {
    this.register = this.register.bind(this);
    this.generateOTPForLogin = this.generateOTPForLogin.bind(this);
    this.loginWithOtp = this.loginWithOtp.bind(this);
  }

  public async register(
    req: Request<any, any, RegisterUserSchema["body"]>,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { email, password } = req.body;
    try {
      const user = await this.authService.register({ email, password });
      return res
        .status(201)
        .json({ message: "User registered", userId: user._id });
    } catch (err: any) {
      if (err.message === "User already exists") {
        return res.status(409).json({ error: err.message });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  public async generateOTPForLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { email } = req.body;
    try {
      await this.authService.generateOtpForLogin(email);
      return successResponse(
        res,
        200,
        "Login OTP has been sent to your email successfully"
      );
    } catch (error: any) {
      next(error);
    }
  }

  public async loginWithOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { email, otp } = req.body;
    try {
      await this.authService.loginWithOtp(email, otp);
      return successResponse(res, 200, "User logged in successfully");
    } catch (error: any) {
      next(error);
    }
  }
}
