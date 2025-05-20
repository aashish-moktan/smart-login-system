import { Request, Response, NextFunction } from "express";
import { AuthService } from "@app/services";

export class AuthController {
  constructor(private authService: AuthService) {
    this.register = this.register.bind(this);
  }

  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    console.log(req.body);
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
}
