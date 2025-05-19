import { Router } from "express";

const router = Router();

export default () => {
  router.get("/", (req, res, next) => {
    res.status(200).send("OK");
  });

  return router;
};
