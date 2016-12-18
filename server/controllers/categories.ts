import { NextFunction, Request, Response } from 'express';

import { Category, iCategory, DocumentQueryCategory} from '../models/category';
import { Todo, iTodo, DocumentQueryTodo} from '../models/todo';

function action(
  promise: DocumentQueryCategory,
  res: Response,
  next: NextFunction
): void {
  promise
    .then(data => res.json({ message: 'success', data: data }))
    .catch(next);
}

export const categories = {
  getAll(req: Request, res: Response, next: NextFunction) {
    action(Category.find(), res, next);
  },
  getCategory(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    action(Category.findById(id), res, next);
  },
  create(req: Request, res: Response, next: NextFunction) {
    let newCategory = new Category(req.body);
    action(newCategory.save() as any, res, next);
  },
  update(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    action(Category.findByIdAndUpdate(id, req.body), res, next);
  },
  delete(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    Category.findByIdAndRemove(id).then(data =>{
      Todo.remove({category: id}).then(data2 =>{
        res.json({ message: 'success', data: data });
      }) .catch(next);
    })
        .catch(next);
    action(Category.findByIdAndRemove(id), res, next);
  }
}
