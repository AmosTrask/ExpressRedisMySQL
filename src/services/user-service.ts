import logger from "../config/logger";
import { User } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";

export class UserService {
    public static async createUser(user: User): Promise<User> {
        const existing: boolean = await this.existingUsername(user.username);
        if (existing) {
          logger.error(`Username ${user.username} already taken`);
          throw new Error("Username already taken.");
        }
        const userSaved = await UserRepository.createUser(user);
        if (userSaved) {
            return userSaved;
        }
        return null;
    }

    public static async getAllUsers(): Promise<User[]> {
      return await UserRepository.getAllUsers();
    }

    public static async getUserByUsername(username: string) : Promise<User> {
      const user = await UserRepository.getUserByUsername(username);
      return user != null ? user : null;
    }

    public static async existingUsername(username: string): Promise<boolean> {
        const user = await UserRepository.getUserByUsername(username);
        if (user) {
          return true;
        } else {
          return false;
        }
    }
}