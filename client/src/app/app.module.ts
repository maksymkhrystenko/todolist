import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { TodoService } from './services/todo.service';
import { CategoryService } from './services/category.service';

import { AppRoutingModule } from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    TodosListComponent,
    CategoriesListComponent
  ],
  providers: [ TodoService, CategoryService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
