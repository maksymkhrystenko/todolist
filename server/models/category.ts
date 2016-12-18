import * as mongoose from 'mongoose';

(<any>mongoose).Promise = global.Promise;

export interface iCategory {
  category: string;
}

export interface CategoryModel extends iCategory, mongoose.Document { }
const todoSchema = new mongoose.Schema({
  category: String,
});

export const Category = mongoose.model<CategoryModel>('Category', todoSchema);

export interface DocumentQueryCategory
  extends mongoose.DocumentQuery<CategoryModel[] | CategoryModel, CategoryModel> { }
