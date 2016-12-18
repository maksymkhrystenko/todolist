import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Category} from '../models/category';

@Injectable()
export class CategoryService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    getAll(): Promise<Category[]> {
        return this.http
            .get('api/categories')
            .toPromise()
            .then(res => {
                let result = res.json();
                if (result.err) throw new Error(result.err);
                return result.data as Category[];
            })
            .catch(this.handleError);
    }

    getCategory(_id: string): Promise<Category> {
        return this.http
            .get(`api/category/${_id}`)
            .toPromise()
            .then(res => {
                let result = res.json();
                if (result.err) throw new Error(result.err);
                return result.data as Category;
            })
            .catch(this.handleError);
    }

    create(category: string): Promise<Category> {
        return this.http
            .post(
                'api/category/',
                JSON.stringify({category: category}),
                {headers: this.headers}
            )
            .toPromise()
            .then(res => {
                let result = res.json();
                if (result.err) throw new Error(result.err);
                return null;
            })
            .catch(this.handleError);
    }

    update(category: Category): Promise<Category> {
        return this.http
            .put(`api/category/${category._id}`, JSON.stringify(category), {headers: this.headers})
            .toPromise()
            .then(res => {
                let result = res.json();
                if (result.err) throw new Error(result.err);
                return null;
            })
            .catch(this.handleError);
    }

    delete(_id: string): Promise<Category> {
        return this.http
            .delete(`api/category/${_id}`, {headers: this.headers})
            .toPromise()
            .then(res => {
                let result = res.json();
                if (result.err) throw new Error(result.err);
                return null;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
