import { Router } from 'express';
import projectController from './project.controller';

export const projectRouter = Router();

projectRouter.param('id', projectController.findByParam);

projectRouter
  .route('/')
  .get(projectController.getAll)
  .post(projectController.createOne);

projectRouter
  .route('/:id')
  .get(projectController.getOne)
  .put(projectController.updateOne)
  .delete(projectController.deleteOne);
