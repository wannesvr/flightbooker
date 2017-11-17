import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import routes from './app-routes';

// Imports for my components
import { AppComponent } from './app.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { FlightSearchPipe } from './pipes/flight-search.pipe';
import { FlightDetailComponent } from './components/flight-detail/flight-detail.component';
import { FlightCancelComponent } from './components/flight-cancel-form/flight-cancel-component';
import { PassengerFormComponent } from './components/passenger-form/passenger-form.component';
import { FlightService } from './services/flight-service';
import { FlightHoverDirective } from './directives/flight-hover.directive';
import { ShowFlagDirective } from './directives/show-flag.directive';

// Imports required for locale (en-US is default locale)
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeNl from '@angular/common/locales/nl';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

registerLocaleData(localeFr);
registerLocaleData(localeNl);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    FlightSearchPipe,
    FlightListComponent,
    FlightDetailComponent,
    PassengerFormComponent,
    FlightHoverDirective,
    ShowFlagDirective,
    FlightCancelComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    ReactiveFormsModule, HttpClientModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  // Make the FlightService available for DI in the whole app.
  providers: [FlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }