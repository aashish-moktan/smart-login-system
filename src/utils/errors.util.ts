export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

// validation error
export class ValidationError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

// auth error
export class AuthError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}
