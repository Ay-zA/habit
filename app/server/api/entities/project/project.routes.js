import { Router } from 'express';
import { celebrate } from 'celebrate';
import ProjectValidation from './project.validtor';
import * as ProjectController from './project.controller';
import { taskRoutes } from './tasks';

const router = new Router();

router.get('/', ProjectController.getProjects);
router.post('/', celebrate(ProjectValidation.post), ProjectController.addProject);
router.get('/:proj_id', ProjectController.getProject);
router.delete('/:proj_id', ProjectController.deleteProject);
router.use('/:proj_id/tasks', taskRoutes);

export default router;
