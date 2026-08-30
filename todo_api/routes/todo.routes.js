import {Router} from 'express';
import * as todoController from '../controller/todo.controller.js';
import { authenticate } from '../auth/authenticate.js';
import { validateQuery, validateTodo } from '../validates/validate.js';
import { query, todo } from '../schemas/schema.js';

const router = Router();
router.post('/create', authenticate, todoController.createTodo);
router.get('/read/:id', authenticate, todoController.readTodo);
router.get('/edit/:id', authenticate, todoController.editTodo);
router.patch('/save/:id', authenticate, validateTodo(todo), todoController.saveTodo);
router.delete('/delete/:id', authenticate, todoController.deleteTodo);
router.get('/query', authenticate, validateQuery(query), todoController.getTodoList);

export default router;