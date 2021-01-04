import { User } from "../entities/user";
import { getManager } from "typeorm";

export class UserRepository {

    public static async getAllUsers() {
        return getManager().getRepository(User).find();
    }

    public static async createUser(user: User) {
        return getManager().getRepository(User).save(user);
    }

    public static async getUserByUsername(username: string) {
        return getManager().getRepository(User).findOne({ username });
    }
}