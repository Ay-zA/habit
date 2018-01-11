import { Router } from 'express';
import { celebrate } from 'celebrate';
import userValidation from './user.validator';
import * as UserController from './user.controller';

const router = new Router();

router.get('/', UserController.getUsers);

export default router;
