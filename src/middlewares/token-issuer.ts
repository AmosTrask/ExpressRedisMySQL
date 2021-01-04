import * as express from "express";
import { Request, Response } from "express";
import { body, validationResult  } from 'express-validator'
const router = express.Router();

import * as jwt from "jsonwebtoken";

const tokenOptions: jwt.SignOptions = {
  expiresIn: 60,
  issuer: "dashrd2",
};

router.post("/", [
    body("username").notEmpty(),
    body("password").notEmpty()
    ], async (req: Request, res: Response) => {
        
  const user = {
      "username": "bla"
  }

  if (user) {
    const payload = {
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET || "mySecret", tokenOptions);

    res.status(200).send({ token });
  } else {
    res.status(401).send({ error: "Incorrect credentials" });
  }
});

export { router as TokenIssuer };