/**
 * Mock for the TranslateService in the ngx-translate module
 */

 import { EventEmitter } from "@angular/core";
import { LangChangeEvent } from "@ngx-translate/core";
import { Observable } from "rxjs/Observable";

export class TranslateServiceMock {
    public readonly onLangChange: EventEmitter<LangChangeEvent>;

    constructor() {
        this.onLangChange = new EventEmitter();
    }

    public get(key: any): any {
		return Observable.of(key);
	}
}