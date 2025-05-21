import { UserOtpModel } from "@app/models";
import { Document } from "mongoose";

// Define interface for User Document
export interface UserOtpDocument extends Document {
  email: string;
  otp: string;
  expiresAt: Number;
  isUsed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Interface for user otp create (DTO)
export interface CreateOtpInput {
  email: string;
  otp: string;
  expiresAt: Number;
  isUsed?: boolean;
}

export interface IUserOtpRepository {
  findOtpByEmail(email: string): Promise<UserOtpDocument | null>;
  create(otpData: CreateOtpInput): Promise<UserOtpDocument>;
}

export class UserOtpRepository implements IUserOtpRepository {
  private readonly userOtpModel: typeof UserOtpModel;

  constructor() {
    this.userOtpModel = UserOtpModel;
  }

  async findOtpByEmail(email: string): Promise<UserOtpDocument | null> {
    try {
      return await this.userOtpModel.findOne({ email, isUsed: false });
    } catch (error: any) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  async create(otpData: CreateOtpInput): Promise<UserOtpDocument> {
    try {
      const userOtp = new this.userOtpModel(otpData);
      return await userOtp.save();
    } catch (error: any) {
      throw new Error(`Error storing user otp: ${error.message}`);
    }
  }
}
