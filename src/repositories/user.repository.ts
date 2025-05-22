import { UserModel } from "@app/models";
import { Document, Types } from "mongoose";

// Define interface for User Document
export interface User extends Document {
  email: string;
  password: string;
  tokenVersion: number;
  createdAt?: Date;
  updatedAt?: Date;
  _id: Types.ObjectId;
}

// Interface for user input data (DTO)
export interface CreateUserInput {
  email: string;
  password: string;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(userData: CreateUserInput): Promise<User>;
  findByIdAndUpdate(userId: string, data: Partial<User>): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
  private readonly userModel: typeof UserModel;

  constructor() {
    this.userModel = UserModel;
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ email });
    } catch (error: any) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  async create(userData: CreateUserInput): Promise<User> {
    try {
      const user = new this.userModel(userData);
      return await user.save();
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async findByIdAndUpdate(
    userId: string,
    data: Partial<User>
  ): Promise<User | null> {
    try {
      return await this.userModel.findByIdAndUpdate(userId, data);
    } catch (error) {
      throw error;
    }
  }
}
