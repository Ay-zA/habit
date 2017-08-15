import { Router } from 'express';
import * as TodoController from '@/api/controllers/todo.controller';

const router = new Router();
router.route('/')
  .get(TodoController.getTodos)
  .post(TodoController.addTodo);

export default router;
