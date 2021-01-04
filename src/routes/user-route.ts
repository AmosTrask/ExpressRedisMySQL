import * as express from 'express';
import { UserController } from '../controllers/user-controller';

const router = express.Router();

router.get("/", (req, res) => UserController.getAllUsers(req, res));

export { router as UserRouter };