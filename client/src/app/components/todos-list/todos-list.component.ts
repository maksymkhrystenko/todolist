import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Todo} from '../../models/todo';
import {Category} from '../../models/category';

import {TodoService} from '../../services/todo.service';
import {CategoryService} from '../../services/category.service';

@Component({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html'
})
export class TodosListComponent implements OnInit {
    private colMd = 12;
    todos: Todo[];
    selectedTodo: Todo;
    selectedEditTodo: string;
    newTodo: string;
    selectedEditCategory: string;
    selectedFilterCategory: string = 'none';
    categories: Category[] = [];
    isFilterDone: boolean = false;
    isFilterActive: boolean = false;

    constructor(private todoService: TodoService,
                private categoryService: CategoryService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getAll();
        this.getAllCategories();
    }

    getAllCategories(): void {
        this.categoryService
            .getAll()
            .then(categories => this.categories = categories);
    }

    getAll(): void {
        this.todoService
            .getAll()
            .then(todos => this.todos = todos);
    }

    delete(todo: Todo): void {
        this.todoService
            .delete(todo._id)
            .then(() => {
                this.todos = this.todos.filter(t => t !== todo);
                if (this.selectedTodo === todo) this.selectedTodo = null;
            });
    }

    create(todo: string, selectedCategory: string): void {
        this.todoService
            .create(todo, selectedCategory)
            .then(() => {
                this.getAll();
                this.newTodo = '';
            });
    }

    updateDoneStatus(todo: Todo) {
        todo.done = !todo.done;
        this.isFilterDone = false;
        this.isFilterActive = false;
        this.selectedFilterCategory = 'none';
        this.todoService
            .update(todo)
            .then(() => this.getAll());
    }

    filterTodos(selectedFilterCategory) {
        let that = this;
        selectedFilterCategory ? this.selectedFilterCategory = selectedFilterCategory : null;
        this.todoService
            .getAll()
            .then(todos => {
                if (this.isFilterDone === false && this.isFilterActive === false && this.selectedFilterCategory === 'none') this.todos = todos;
                else
                    this.todos = todos.filter((todo, index) => {
                        let isFilterDoneDetect;
                        let isFilterActiveDetect;
                        let isFilterCategoryDetect;
                        this.isFilterDone === true ? isFilterDoneDetect = true : isFilterDoneDetect = false;
                        this.isFilterActive === true ? isFilterActiveDetect = true : isFilterActiveDetect = false;
                        that.selectedFilterCategory === 'none' ? isFilterCategoryDetect = todo.category._id : isFilterCategoryDetect = that.selectedFilterCategory;
                        return (todo.category._id === isFilterCategoryDetect && !this.isFilterDone && !this.isFilterActive) || (todo.done === isFilterDoneDetect && todo.active === isFilterActiveDetect && todo.category._id === isFilterCategoryDetect) || (todo.done === true && todo.active === true && todo.category._id === isFilterCategoryDetect);
                    });
            });
    }


    updateActiveStatus(todo: Todo) {
        todo.active = !todo.active;
        this.isFilterDone = false;
        this.isFilterActive = false;
        this.selectedFilterCategory = 'none';
        this.todoService
            .update(todo)
            .then(() => this.getAll());
    }

    editTodo(todo: any): void {
        this.colMd = 8;
        this.selectedTodo = todo;
        this.selectedEditTodo = todo.todo;
        this.selectedEditCategory = todo.category._id;
    }

    onChangeSelectedEditCategory(id) {
        this.selectedEditCategory = id;
    }

    cancel(): void {
        this.getAll();
        this.selectedTodo = null;
        this.colMd = 12;
    }

    update(): void {
        this.selectedTodo.category = this.selectedEditCategory;
        this.selectedTodo.todo = this.selectedEditTodo;
        this.todoService.update(this.selectedTodo).then(() => this.getAll());
        this.selectedTodo = null;
        this.colMd = 12;
    }
}
