import { Router } from 'express';
import celebrate from 'celebrate';
import todoValidation from '@/api/validators/todo.validator';
import * as TodoController from '@/api/controllers/todo.controller';

const router = new Router();
router.get('/', TodoController.getTodos);
router.post('/', celebrate(todoValidation.post), TodoController.addTodo);
router.get('/:id', TodoController.getTodo);
router.delete('/:id', TodoController.deleteTodo);
export default router;
