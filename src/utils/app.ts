import express, { Application } from "express";
import { applyRoutes } from "@app/middlewares";
import { connectDB } from "@app/config";
import { UserRepository } from "@app/repositories";
import { globalErrorHandler } from "@app/middlewares";

export interface IDependencies {
  userRepository?: UserRepository;
}
class App {
  private static instance: App;
  private app: Application;
  private static dependencies: IDependencies | undefined;

  constructor() {
    this.app = express();
    this.applyMiddlewares();
  }

  public static async init(dependencies?: {
    userRepository: UserRepository;
  }): Promise<any> {
    if (!App.instance) {
      App.instance = new App();
      await App.instance.connectToDB();
      App.dependencies = dependencies;
    }
    return App.instance;
  }

  private applyMiddlewares(): void {
    this.app.use(express.json());
    applyRoutes(this.app, App.dependencies);
    this.app.use(globalErrorHandler);
  }

  public async connectToDB(): Promise<any> {
    await connectDB();
  }

  getApp(): Application {
    return this.app;
  }
}

export default App;
