import express, { Application } from "express";
import { applyRoutes } from "@app/middlewares";
import { connectDB } from "@app/config";

interface IApp {
  applyMiddlewares(): void;
  connectToDB(): void;
  getApp(): Application;
}

class App implements IApp {
  private app: Application;

  constructor() {
    this.app = express();
    this.applyMiddlewares();
    this.connectToDB();
  }

  applyMiddlewares(): void {
    this.app.use(express.json());
    applyRoutes(this.app);
  }

  connectToDB(): void {
    connectDB().then();
  }

  getApp(): Application {
    return this.app;
  }
}

export default new App();
