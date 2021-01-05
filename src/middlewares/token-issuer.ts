import * as express from "express";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
const router = express.Router();

import * as jwt from "jsonwebtoken";
import { User } from "../entities/user";
import { UserService } from "../services/user-service";

const tokenOptions: jwt.SignOptions = {
  expiresIn: 60,
  issuer: "dashrd2",
};

router.post(
  "/",
  [body("username").notEmpty(), body("password").notEmpty()],
  async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    const user = await UserService.getUserByUsername(req.body.username);
    
    if (user) {
      const payload = {
        username: user.username,
      };
      const token = jwt.sign(
        payload,
        process.env.TOKEN_SECRET || "mySecret",
        tokenOptions
      );

      res.status(200).send({ token });
    } else {
      res.status(401).send({ error: "Incorrect credentials" });
    }
  }
);

export { router as TokenIssuer };
