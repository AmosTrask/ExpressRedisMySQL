import * as express from "express";
import { Request, Response } from "express";
const router = express.Router();

import * as jwt from "jsonwebtoken";

router.all("*", (req: Request, res: Response, next) => {
  if (!req.get("Authorization")) {
    res.status(401).send({ error: "You must be authenticated" });
  } else {
    const authorizationType = req.get("Authorization").split(" ")[0];
    const token = req.get("Authorization").split(" ")[1];

    if (authorizationType !== "Bearer") {
      res.status(401).send({ error: "You must provide a Bearer token" });
    } else {
      try {
        jwt.verify(token, process.env.TOKEN_SECRET || "mySecret");
        next();
      } catch (error) {
        res.status(401).send({ error: "Invalid token" });
      }
    }
  }
});

export { router as AuthGuard };