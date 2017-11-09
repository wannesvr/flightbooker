import { Component, OnInit } from '@angular/core';

import { Flight } from '../model/Flight';
import { AirplaneType } from '../model/AirplaneType';
import { FlightService } from './flight-service';
import { Passenger } from '../model/Passenger';

@Component({
    selector: 'flight-list-component',
    templateUrl: 'flight-list.component.html',
    styleUrls: ['flight-list.component.css']
})
export class FlightListComponent implements OnInit {
    
    public service: FlightService;
    public flights: Flight[];

    public constructor() {
         this.service = new FlightService();  
        console.log('constructor')        
    }

    ngOnInit(): void {
        console.log('ngOnInit gets called')
        this.flights = this.service.getFlights();
    }

    enableBooking(flightId: number): void {
        const flightToBook:Flight = this.flights.filter((flight) => flight.id === flightId)[0];

        if (flightToBook) {
            flightToBook.isBooking = ! flightToBook.isBooking;
        }
    }

    addPassenger(passenger: Passenger, flightId: number): void {
        const flightToBook:Flight = this.flights.filter((flight) => flight.id === flightId)[0];
        
        flightToBook.addPassenger(passenger);
        flightToBook.isBooking = false;
    }
}