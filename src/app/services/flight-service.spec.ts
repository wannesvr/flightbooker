import { FlightService } from './flight-service';
import { Flight } from '../model/flight';
import { AirplaneType } from '../model/airplane-type';

import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injector } from '@angular/core';

describe('FlightService', () => {
    let service: FlightService;
    let http: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                FlightService
            ]
        });

        service = TestBed.get(FlightService);
        http = TestBed.get(HttpTestingController);
    });

    it('getFlights should return an array of flights', () => {
        const flights: Flight[] = [
            new Flight('FlightOne', 'FlightFrom', 'FlightTo', 0, AirplaneType.Airbus_A320)
        ];

        let response;

        service.getFlights().subscribe((httpResponse) => {
            response = httpResponse;
        });


        http.expectOne('http://localhost:3000/flights').flush(flights);
        expect(response).toEqual(flights);
    });

    it('searchFlights should return an array of flights', () => {
        const flights: Flight[] = [
            new Flight('FlightOne', 'FlightFrom', 'FlightTo', 0, AirplaneType.Airbus_A320),
            new Flight('FlightTwo', 'FlightFrom', 'FlightTo', 0, AirplaneType.Airbus_A320)
        ];

        const expectedResponse: Flight[] = [flights[1]];

        let response;

        service.searchFlights('FlightTwo').subscribe((httpResponse) => {
            response = httpResponse;
        });

        http.expectOne('http://localhost:3000/flights').flush(flights);
        expect(response).toEqual(expectedResponse);
    });

    it('updateFlight should return the updated flight', () => {
        const flight: Flight = new Flight('FlightOne', 'FlightFrom', 'FlightTo', 0, AirplaneType.Airbus_A320);

        let response;

        service.updateFlight(flight).subscribe((httpResponse) => {
            response = httpResponse;
        });

        http.expectOne('http://localhost:3000/flights/' + flight.id).flush(flight);
        expect(response).toEqual(flight);
    });
});