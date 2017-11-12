import { Component, OnInit, Inject } from '@angular/core';

import { Flight } from '../../model/flight';
import { AirplaneType } from '../../model/airplane-type';
import { FlightService } from '../../services/flight-service';
import { Passenger } from '../../model/passenger';
import { FormBuilder, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';

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
    /**
     * The FormControl for the search field.
     */
    public searchInput: FormControl;

    /**
     * The value the user is searching for.
     */
    public searchValue: string;

    /**
     * The amount of flights that were found matching the user's search input.
     */
    public foundFlights: number = 0;
    public flights: Flight[];

    public constructor(private service: FlightService, private formBuilder: FormBuilder) {
        this.searchInput = new FormControl();

        /**
         * Subscribe to the valueChanges observer of the search form control.
         * By using debounceTime we limit the amount of calls to the webserver by saying only 
         * continue when nothing has changed for 400ms. The user has to stop typing for 400ms before
         * the call to the service is made.
         */
        this.searchInput.valueChanges.debounceTime(400).subscribe(input => {
            this.service.searchFlights(input).subscribe(result => {
                this.searchValue = input;
                this.foundFlights = result.length;
            });
        });
    }

    /**
     * Angular life cycle hook. Gets called when the component's databound properties are initialized.
     * We call our service here instead of the constructor because this is a lot easier to test.
     * This is because we do not have control over when the constructor is called in an integration test,
     * while ngOnInit has to be called manually there.
     */
    ngOnInit(): void {
        this.service.getFlights().subscribe(flights => {
            this.flights = flights;
        });
    }

    /**
     * Enable booking for a certain flight.
     * @param flightId The id of the flight you want to enable booking for
     */
    enableBooking(flightId: number): void {
        const flightToBook: Flight | undefined = this.flights.find(flight => flight.id === flightId);

        if (flightToBook) {
            flightToBook.isBooking = !flightToBook.isBooking;
        }
    }

    /**
     * Adds a passenger to the flight if it is in booking mode and is not full.
     * @param passenger The passenger to add
     * @param flightId The id of the flight you want to add the passenger to
     */
    addPassenger(passenger: Passenger, flightId: number): void {
        let flight: Flight = this.flights.filter((flight) => flight.id === flightId)[0];

        if (flight.isBooking && !flight.isFull) {
            flight.passengers.push(passenger);
            flight.isFull = --flight.seatsLeft === 0;
            flight.isBooking = false;

            this.service.updateFlight(flight).subscribe(response => flight = response);
        }
    }
}