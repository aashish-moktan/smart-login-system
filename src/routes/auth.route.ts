import { Router } from "express";
import { AuthController } from "@app/controllers";
import { AuthService } from "@app/services";
import { UserRepository } from "@app/repositories";

const router = Router();

export default (userRepository?: UserRepository) => {
  const userRepo = userRepository ?? new UserRepository();
  const authService = new AuthService(userRepo);
  const authController = new AuthController(authService);

  router.post("/register", authController.register);

  return router;
};
