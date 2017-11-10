import { Component, Inject } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';

import { Observable, Subscriber } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    public static localeObservable: Observable<string>;
    private locale: string = 'en-US';

    private static localeSubscriber: Subscriber<string>;

    constructor(private translate: TranslateService) {
        this.translate.addLangs(['en-US', 'nl-BE']);
        this.translate.setDefaultLang('en-US');

        if (! AppComponent.localeObservable) {
            AppComponent.localeObservable = Observable.create((subscriber: Subscriber<string>) => {
                AppComponent.localeSubscriber = subscriber;
            });
        } 

        this.translate.onLangChange.subscribe((changeEvent: LangChangeEvent) => {
            AppComponent.localeSubscriber.next(changeEvent.lang);
        });
    }

    changeLanguage() {
        this.locale = this.locale === 'en-US' ? 'nl-BE' : 'en-US';
        this.translate.use(this.locale);
    }
}