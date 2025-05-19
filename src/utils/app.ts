import express, { Application } from "express";
import { applyRoutes } from "../middlewares";

interface IApp {
  getApp(): Application;
}

class App implements IApp {
  private app: Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    applyRoutes(this.app);
  }

  getApp(): Application {
    return this.app;
  }
}

export default new App();
