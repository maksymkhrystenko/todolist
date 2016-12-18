import { NextFunction, Request, Response } from 'express';

import { Todo, iTodo, DocumentQueryTodo} from '../models/todo';


function action(
  promise: DocumentQueryTodo,
  res: Response,
  next: NextFunction
): void {
  promise
    .then(data => res.json({ message: 'success', data: data }))
    .catch(next);
}

export const todos = {
  getAll(req: Request, res: Response, next: NextFunction) {
    action(Todo.find().populate('category'), res, next);
  },
  getTodo(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    action(Todo.findById(id).populate('category'), res, next);
  },
  create(req: Request, res: Response, next: NextFunction) {
    let newTodo = new Todo(req.body);
    action(newTodo.save() as any, res, next);
  },
  update(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    action(Todo.findByIdAndUpdate(id, req.body).populate('category'), res, next);
  },
  delete(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    action(Todo.findByIdAndRemove(id).populate('category'), res, next);
  }
}
