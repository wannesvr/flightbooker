import { Component, Inject } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    public static DEFAULT_LOCALE = 'en-US';
    private locale: string = AppComponent.DEFAULT_LOCALE;

    constructor(private translate: TranslateService) {
        this.translate.addLangs(['en-US', 'nl-BE']);
        this.translate.setDefaultLang('en-US');
    }

    changeLanguage() {
        this.locale = this.locale === 'en-US' ? 'nl-BE' : 'en-US';
        this.translate.use(this.locale);
    }
}