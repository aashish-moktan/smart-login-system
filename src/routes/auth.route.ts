import { Router } from "express";
import { AuthController } from "@app/controllers";
import { AuthService, EmailService } from "@app/services";
import { UserRepository, UserOtpRepository } from "@app/repositories";
import { registerUserSchema, generateOTPForLoginSchema } from "@app/schemas";
import validateRequest from "@app/middlewares/validateRequest.middleware";

const router = Router();

export default (userRepository?: UserRepository) => {
  const emailService = new EmailService();
  const userRepo = userRepository ?? new UserRepository();
  const userOtpRepo = new UserOtpRepository();
  const authService = new AuthService(userRepo, emailService, userOtpRepo);
  const authController = new AuthController(authService);

  router.post(
    "/register",
    validateRequest(registerUserSchema),
    authController.register
  );

  router.post(
    "/otp/generate",
    validateRequest(generateOTPForLoginSchema),
    authController.generateOTPForLogin
  );

  router.post(
    "/login/otp",
    validateRequest(generateOTPForLoginSchema),
    authController.loginWithOtp
  );

  return router;
};
