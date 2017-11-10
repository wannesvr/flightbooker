import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FlightService } from '../../services/flight-service';
import { Flight } from '../../model/flight';
import { Passenger } from '../../model/passenger';

import 'rxjs/add/operator/map'

@Component({
    selector: 'flight-cancel-component',
    templateUrl: 'flight-cancel.component.html'
})

export class FlightCancelComponent implements OnInit {
    private flightId: number;
    private passengerId: number; 
    private errorMessage: string;

    constructor(private service: FlightService, private route:ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.route.params.subscribe(value => {
            this.flightId = value.flightId;
            this.passengerId = value.passengerId;
        })
    }

    _cancelBooking() {
        this.service.getFlights().subscribe(
            flights => {
                const flight: Flight | undefined = flights.find(f => f.id == this.flightId);

                if (flight) {
                    const passengerIndex: number = flight.passengers.findIndex(p => p.id == this.passengerId);

                    if (passengerIndex > -1) {
                        flight.passengers.splice(passengerIndex, 1);

                        this.service.updateFlight(flight).subscribe(
                            succes => this._navigateBack(),
                            error => this.errorMessage = 'Cancel request failed.'
                        );
                    } else {
                        this.errorMessage = `No passenger with id ${this.passengerId} found for the flight to ${flight.to}.`;
                    }
                } else {
                    this.errorMessage = `No flight with id ${this.passengerId} found.`;
                }
            });
    }

    _navigateBack() {
        this.router.navigate(['/']);
    }
}