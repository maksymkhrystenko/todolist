import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Category} from '../../models/category';

import {CategoryService} from '../../services/category.service';

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit {
    private colMd = 12;
    categories: Category[];
    selectedCategory: Category;
    newCategory: string;

    constructor(private categoryService: CategoryService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getAll();
    }

    getAll(): void {
        this.categoryService
            .getAll()
            .then(categories => this.categories = categories);
    }

    delete(category: Category): void {
        this.categoryService
            .delete(category._id)
            .then(() => {
                this.categories = this.categories.filter(t => t !== category);
                if (this.selectedCategory === category) this.selectedCategory = null;
            });
    }

    create(category: string): void {
        this.categoryService
            .create(category)
            .then(() => {
                this.getAll();
                this.newCategory = '';
            });
    }

    editCategory(category: Category): void {
        this.colMd = 8;
        this.selectedCategory = category;
    }

    cancel(): void {
        this.getAll();
        this.selectedCategory = null;
        this.colMd = 12;
    }

    update(): void {
        this.categoryService.update(this.selectedCategory).then(() => this.getAll());
        this.selectedCategory = null;
        this.colMd = 12;
    }
}
