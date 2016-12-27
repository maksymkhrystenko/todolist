import { Router } from 'express';

import { todos } from './controllers/todos';
import { categories } from './controllers/categories';

let router = Router();
// API

// todos
router.get   ('/api/todos',    todos.getAll);
router.get   ('/api/todo/:id', todos.getTodo);
router.post  ('/api/todo',     todos.create);
router.put   ('/api/todo/:id', todos.update);
router.delete('/api/todo/:id', todos.delete);
// categories
router.get   ('/api/categories',    categories.getAll);
router.get   ('/api/category/:id', categories.getCategory);
router.post  ('/api/category',     categories.create);
router.put   ('/api/category/:id', categories.update);
router.delete('/api/category/:id', categories.delete);

export default router;
