import { Component, OnInit } from '@angular/core';

import { Flight } from '../../model/Flight';
import { AirplaneType } from '../../model/AirplaneType';
import { FlightService } from '../../services/flight-service';
import { Passenger } from '../../model/Passenger';

/**
 * List-component that has a list of flights
 * and methods to enable booking on a certain flight and
 * to add a passenger to a certain flight.
 */
@Component({
    selector: 'flight-list-component',
    templateUrl: 'flight-list.component.html',
    styleUrls: ['flight-list.component.css']
})
export class FlightListComponent implements OnInit {
    
    public selectedValue: string = 'en-US';
    public flights: Flight[];

    public constructor(private service: FlightService) {
    }

    /**
     * Angular life cycle hook. Gets called when the component's databound properties are initialized.
     * We call our service here instead of the constructor because this is a lot easier to test.
     * This is because we do not have control over when the constructor is called in an integration test,
     * while ngOnInit has to be called manually there.
     */
    ngOnInit(): void {
        this.flights = this.service.getFlights();
    }

    /**
     * Enable booking for a certain flight.
     * @param flightId The id of the flight you want to enable booking for
     */
    enableBooking(flightId: number): void {
        const flightToBook:Flight = this.flights.filter((flight) => flight.id === flightId)[0];

        if (flightToBook) {
            flightToBook.isBooking = ! flightToBook.isBooking;
        }
    }

    /**
     * Adds a passenger to a flight.
     * @param passenger The passenger to add
     * @param flightId The id of the flight you want to add the passenger to
     */
    addPassenger(passenger: Passenger, flightId: number): void {
        const flightToBook:Flight = this.flights.filter((flight) => flight.id === flightId)[0];
        
        flightToBook.addPassenger(passenger);
        flightToBook.isBooking = false;
    }
}