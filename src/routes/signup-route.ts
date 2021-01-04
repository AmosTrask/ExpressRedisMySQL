import * as express from 'express';
import { SignupController } from '../controllers/signup-controller';
import { body } from 'express-validator';

const router = express.Router();


router.post("/", body('username').notEmpty(), body('role').notEmpty(), (req, res) => SignupController.createUser(req, res));

export { router as SignupRouter };
