import {Component} from '@angular/core';
import {Location} from '@angular/common';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    private title = 'Todo Application with categories';

    constructor(private _loc: Location) {

    }

    isCurrentPath(str) {
        return this._loc.path().replace(/\//g, '') === str ? true : false;
    }

    private pages = [
        {name: 'todos', active: this.isCurrentPath('todos')},
        {name: 'categories', active: this.isCurrentPath('categories')},
    ];

    private navSwitch(target: string): void {
        for (let page of this.pages) {
            if (page.name == target) page.active = true;
            else page.active = false;
        }
    }

    private activePage(): {name: string, active: boolean} {
        return this.pages.find(page => page.active);
    }

    private isActive(pageName: string): boolean {
        return this.pages.find(page => page.name === pageName).active;
    }
}
