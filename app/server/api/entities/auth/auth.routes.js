import { Router } from 'express';
import { celebrate } from 'celebrate';
import { localAuth } from '@/services/auth.service';
import authValidation from './auth.validator';
import * as AuthController from './auth.controller';

const router = new Router();

router.post('/signup', celebrate(authValidation.signup), AuthController.signup);
router.post('/login', celebrate(authValidation.login), localAuth, AuthController.login);

export default router;
