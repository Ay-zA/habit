import { Router } from 'express';
import authController from './auth.controller';

export const authRouter = Router();

authRouter.param('id', authController.findByParam);

authRouter
  .route('/')
  .get(authController.getAll)
  .post(authController.createOne);

authRouter
  .route('/:id')
  .get(authController.getOne)
  .put(authController.updateOne)
  .delete(authController.deleteOne);
