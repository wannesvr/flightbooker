import { Component, OnInit, Inject } from '@angular/core';

import { Flight } from '../../model/Flight';
import { AirplaneType } from '../../model/AirplaneType';
import { FlightService } from '../../services/flight-service';
import { Passenger } from '../../model/Passenger';
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
    public searchObservable: Observable<number>;

    public searchInput: FormControl;
    public searchValue: string;
    public foundFlights: number;

    public selectedValue: string;
    public flights: Flight[];

    public constructor(private service: FlightService, private formBuilder: FormBuilder) {
        this.searchInput = new FormControl();
        this.searchInput.valueChanges.debounceTime(400).subscribe(input => {
            this.searchValue = input;

            this.searchObservable = this.service.searchFlights(input).map(result => {
               return result.length;
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
        const flightToBook:Flight | undefined = this.flights.find(flight => flight.id === flightId);

        if (flightToBook) {
            flightToBook.isBooking = ! flightToBook.isBooking;
        }
    }

    /**
     * Adds a passenger to the flight if it is in booking mode and is not full.
     * @param passenger The passenger to add
     * @param flightId The id of the flight you want to add the passenger to
     */
    addPassenger(passenger: Passenger, flightId: number): void {
        let flight:Flight = this.flights.filter((flight) => flight.id === flightId)[0];
        
        if (flight.isBooking && !flight.isFull) {
            flight.passengers.push(passenger);
            flight.isFull = --flight.seatsLeft === 0;
            flight.isBooking = false;

            this.service.updateFlight(flight).subscribe(response => flight = response);
        }
    }
}