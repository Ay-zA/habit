import { Router } from 'express';
import * as TodoController from '@/controllers/todo.controller';

const router = new Router();
router.route('/todos')
      .get(TodoController.getTodos)
      .post(TodoController.addTodo);

export default router;
