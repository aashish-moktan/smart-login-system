import { Document, FilterQuery, UpdateQuery, Types } from "mongoose";
import { UserOtpModel } from "@app/models";

// define interface for User Document
export interface UserOtp extends Document {
  email: string;
  otp: string;
  expiresAt: Number;
  isUsed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id: Types.ObjectId;
}

// interface for user otp create (DTO)
export interface CreateOtpInput {
  email: string;
  otp: string;
  expiresAt: Number;
  isUsed?: boolean;
}

// interface for user find and update
export type FindUserOtpQuery = FilterQuery<UserOtp>;
export type UpdateUserOtpQuery = UpdateQuery<UserOtp>;

export interface IUserOtpRepository {
  findOtpByEmail(email: string): Promise<UserOtp | null>;
  create(otpData: CreateOtpInput): Promise<UserOtp>;
}

export class UserOtpRepository implements IUserOtpRepository {
  private readonly userOtpModel: typeof UserOtpModel;

  constructor() {
    this.userOtpModel = UserOtpModel;
  }

  async findOne(query: FindUserOtpQuery): Promise<UserOtp | null> {
    try {
      return await this.userOtpModel.findOne(query).exec();
    } catch (error: any) {
      throw new Error(
        `UserOtpService.findOne failed: ${(error as Error).message}`
      );
    }
  }

  async findOtpByEmail(email: string): Promise<UserOtp | null> {
    try {
      return await this.userOtpModel.findOne({ email, isUsed: false });
    } catch (error: any) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  async create(otpData: CreateOtpInput): Promise<UserOtp> {
    try {
      const userOtp = new this.userOtpModel(otpData);
      return await userOtp.save();
    } catch (error: any) {
      throw new Error(`Error storing user otp: ${error.message}`);
    }
  }

  async updateById(
    id: string,
    updateData: UpdateUserOtpQuery
  ): Promise<UserOtp | null> {
    try {
      return await this.userOtpModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
    } catch (error: any) {
      throw new Error(`Error updating user otp: ${error.message}`);
    }
  }
}
