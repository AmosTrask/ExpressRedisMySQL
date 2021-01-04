import { Request, Response } from "express";
import { User } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";
import { UserService } from "../services/user-service";


export class UserController {
    public static async getAllUsers (req: Request, res: Response) {
        const userList: User [] = await UserRepository.getAllUsers();
        res.send(userList);
    }
}
