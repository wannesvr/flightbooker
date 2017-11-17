/**
 * Mock for the TranslateLoader in the ngx-translate module
 */

import { Observable } from "rxjs/Observable";

export class TranslateLoaderMock {
    getTranslation(lang: string): Observable<any> {
        return Observable.of([]);
    }
}