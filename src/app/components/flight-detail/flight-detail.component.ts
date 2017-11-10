import { Component, Input } from '@angular/core';
import { Flight } from '../../model/Flight';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


/**
 * Simple component that displays a Flight's properties.
 */
@Component({
    selector: 'flight-detail',
    templateUrl: 'flight-detail.component.html'
})
export class FlightDetailComponent {
    // This component expects a flight as input
    // <flight-detail [flight]="myFlight"></flight-detail>
    @Input() flight: Flight;
    locale: string;

    constructor(private router: Router) {
        AppComponent.localeObservable.subscribe((locale) => this.locale = locale);
    }

    _cancelBooking(passengerId: number) {
        this.router.navigate(['/flights/cancel', this.flight.id, passengerId]);
    }
}