import { Request, Response, NextFunction, Router } from "express";

const router = Router();

export default () => {
  router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json([]);
  });

  return router;
};
