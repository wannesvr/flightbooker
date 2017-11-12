import { Component, Input } from '@angular/core';
import { Flight } from '../../model/flight';
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

    private locale: string;

    constructor(private router: Router, private languageService: TranslateService) {
        languageService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
            this.locale = langChangeEvent.lang;
        });
    }

    _cancelBooking(passengerId: number) {
        this.router.navigate(['/flights/cancel', this.flight.id, passengerId]);
    }
}