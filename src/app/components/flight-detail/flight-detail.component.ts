import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../../model/Flight';


/**
 * Simple component that displays a Flight's properties.
 */
@Component({
    selector: 'flight-detail',
    templateUrl: 'flight-detail.component.html'
})
export class FlightDetailComponent implements OnInit {
    // This component expects a flight as input
    // <flight-detail [flight]="myFlight"></flight-detail>
    @Input() flight: Flight;

    constructor() { }

    ngOnInit() { }
}