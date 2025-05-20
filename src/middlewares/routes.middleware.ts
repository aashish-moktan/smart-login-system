import { Application } from "express";
import { appRoutes, userRoutes, authRoutes } from "../routes";
import { IDependencies } from "@app/utils/app";

const applyRoutes = (app: Application, dependencies?: IDependencies) => {
  // v1
  app.use("/api/health", appRoutes());
  app.use("/api/v1/auth", authRoutes(dependencies?.userRepository));
  app.use("/api/v1/users", userRoutes());
};

export default applyRoutes;
