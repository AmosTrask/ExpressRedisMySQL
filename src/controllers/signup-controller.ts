import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../entities/user";
import { UserService } from "../services/user-service";

export class SignupController {
  public static async createUser(req: Request, res: Response) {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    let user: User = { username: req.body.username, role: req.body.role};
    await UserService.createUser(user)
      .then((createdUser) => {
        return res.status(201).send(createdUser);
      })
      .catch((err) => {
        if (err.message) {
          return res.status(400).send({ error: err.message });
        } else {
          return res.status(500);
        }
      });
  }
}
