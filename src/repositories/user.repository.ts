import { UserModel } from "@app/models";
import { Document } from "mongoose";

// Define interface for User Document
export interface UserDocument extends Document {
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

// Interface for user input data (DTO)
export interface CreateUserInput {
  email: string;
  password: string;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<UserDocument | null>;
  create(userData: { email: string; password: string }): Promise<UserDocument>;
}

export class UserRepository implements IUserRepository {
  private readonly userModel: typeof UserModel;

  constructor() {
    this.userModel = UserModel;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      return await this.userModel.findOne({ email });
    } catch (error: any) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  async create(userData: {
    email: string;
    password: string;
  }): Promise<UserDocument> {
    try {
      const user = new this.userModel(userData);
      return await user.save();
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
}
