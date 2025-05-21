import { AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const validateRequest = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors.map((err) => ({
            field: err.path[err.path.length - 1],
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};

export default validateRequest;
