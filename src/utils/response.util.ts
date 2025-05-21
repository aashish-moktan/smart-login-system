import { Response } from "express";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T | null;
}

export const successResponse = <T>(
  res: Response,
  statusCode: number = 200,
  message: string,
  data?: T
): Response<ApiResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number = 500,
  message: string,
  error?: any
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    ...error(error && { error }),
  });
};
