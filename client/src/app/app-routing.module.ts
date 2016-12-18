import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';

const routes: Routes = [
  { path: 'todos', component: TodosListComponent },
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'categories', component: CategoriesListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
