import { Request, Response } from "express";
import { User } from "../entities/user";
import { UserService } from "../services/user-service";
export class UserController {
    public static async getAllUsers (req: Request, res: Response) {
        const userList: User [] = await UserService.getAllUsers();
        res.send(userList);
    }
}
