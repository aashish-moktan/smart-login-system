import { Application } from "express";
import { appRoutes, userRoutes } from "../routes";

const applyRoutes = (app: Application) => {
  // api v1
  app.use("/api/health", appRoutes());
  app.use("/api/v1/users", userRoutes());
};

export default applyRoutes;
