import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { FlightListComponent } from './components/flight-list/flight-list.component';
import { FlightSearchPipe } from './pipes/flight-search.pipe';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeNl from '@angular/common/locales/nl';
import { FlightDetailComponent } from './components/flight-detail/flight-detail.component';
import { PassengerFormComponent } from './components/passenger-form/passenger-form';
import { FlightService } from './services/flight-service';
import { FlightHoverDirective } from './directives/flight-hover.directive';
import { ShowFlagDirective } from './directives/show-flag.directive';

registerLocaleData(localeFr);
registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,  
    FlightSearchPipe, 
    FlightListComponent,
    FlightDetailComponent,
    PassengerFormComponent,
    FlightHoverDirective,
    ShowFlagDirective
    ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule
  ],
  providers: [FlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
