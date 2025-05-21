import { Request, Response, NextFunction } from "express";
import { ApiError, ValidationError, AuthError } from "@app/utils";
import { env } from "@app/config";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ValidationError) {
    statusCode = 400;
    message = err.message;
  } else if (err instanceof AuthError) {
    statusCode = 401;
    message = err.message;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    data: null,
    message,
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
