import express, { Application } from "express";
import { applyRoutes } from "@app/middlewares";
import { connectDB } from "@app/config";

class App {
  private static instance: App;
  private app: Application;

  constructor() {
    this.app = express();
    this.applyMiddlewares();
  }

  public static async init(): Promise<any> {
    if (!App.instance) {
      App.instance = new App();
      await App.instance.connectToDB();
    }
    return App.instance;
  }

  private applyMiddlewares(): void {
    this.app.use(express.json());
    applyRoutes(this.app);
  }

  public async connectToDB(): Promise<any> {
    await connectDB();
  }

  getApp(): Application {
    return this.app;
  }
}

export default App;
