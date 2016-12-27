import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Todo} from '../models/todo';

@Injectable()
export class TodoService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    getAll(): Promise<Todo[]> {
        return this.http
            .get('api/todos')
            .toPromise()
            .then(res => {
                let result = res.json();
                if (result.err) throw new Error(result.err);
                return result.data as Todo[];
            })
            .catch(this.handleError);
    }

    getTodo(_id: string): Promise<Todo> {
        return this.http
            .get(`api/todo/${_id}`)
            .toPromise()
            .then(res => {
                let result = res.json();
                if (result.err) throw new Error(result.err);
                return result.data as Todo;
            })
            .catch(this.handleError);
    }

    create(todo: string, category: string): Promise<Todo> {
        return this.http
            .post(
                'api/todo/',
                JSON.stringify({todo: todo, done: false, active: false, category: category}),
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

    update(todo: Todo): Promise<Todo> {
        return this.http
            .put(`api/todo/${todo._id}`, JSON.stringify(todo), {headers: this.headers})
            .toPromise()
            .then(res => {
                let result = res.json();
                if (result.err) throw new Error(result.err);
                return null;
            })
            .catch(this.handleError);
    }

    delete(_id: string): Promise<Todo> {
        return this.http
            .delete(`api/todo/${_id}`, {headers: this.headers})
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
