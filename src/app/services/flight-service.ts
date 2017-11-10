import { Flight } from "../model/Flight";
import { AirplaneType } from "../model/AirplaneType";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

import 'rxjs/add/operator/map';

@Injectable()
export class FlightService { 

    constructor(private http:HttpClient) {

    }

    getFlights() : Observable<Flight[]> {
        return this.http.get<Flight[]>('http://localhost:3000/flights');
    }

    searchFlights(searchValue: string) : Observable<Flight[]> {
        return this.http.get<Flight[]>('http://localhost:3000/flights')
            .map((flights) => {
                return flights.filter(flight => flight.name.toLowerCase().indexOf(searchValue.toLowerCase()) > - 1);
            });
    } 

    updateFlight(flight: Flight) : Observable<Flight> {
        return this.http.put<Flight>(`http://localhost:3000/flights/${flight.id}`, flight, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
