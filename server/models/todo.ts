import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;
import { Category, iCategory} from './category';

(<any>mongoose).Promise = global.Promise;

export interface iTodo {
  todo: string;
  done: boolean;
  active: boolean;
  category: iCategory;
}

export interface TodoModel extends iTodo, mongoose.Document { }
const todoSchema = new mongoose.Schema({
  todo: String,
  done: Boolean,
  active: Boolean,
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});

export const Todo = mongoose.model<TodoModel>('Todo', todoSchema);

export interface DocumentQueryTodo
  extends mongoose.DocumentQuery<TodoModel[] | TodoModel, TodoModel> { }
