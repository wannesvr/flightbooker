import { Flight } from "../../model/flight";
import { AirplaneType } from "../../model/airplane-type";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/from";

export class FlightServiceMock {
    getFlights(): Observable<Flight[]> {
        return Observable.from<Flight[]>([
            [
                new Flight('Test-1234', 'TestFrom', 'TestTo', 250, AirplaneType.Boeing_737),
                new Flight('Test-5678', 'TestFrom', 'TestTo', 100, AirplaneType.Airbus_A320)
            ]
        ]);
    }

    updateFlight(flight: Flight): Observable<Flight> {
        return Observable.of(flight);
    }
}