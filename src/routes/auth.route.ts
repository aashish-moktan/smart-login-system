import { Router } from "express";
import { AuthController } from "@app/controllers";
import { AuthService } from "@app/services";
import { UserRepository } from "@app/repositories";
import validateRequest from "@app/middlewares/validateRequest.middleware";
import { registerUserSchema } from "@app/schemas";

const router = Router();

export default (userRepository?: UserRepository) => {
  const userRepo = userRepository ?? new UserRepository();
  const authService = new AuthService(userRepo);
  const authController = new AuthController(authService);

  router.post(
    "/register",
    validateRequest(registerUserSchema),
    authController.register
  );

  return router;
};
