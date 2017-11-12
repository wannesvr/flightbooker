import { Flight } from "../../model/flight";
import { AirplaneType } from "../../model/airplane-type";

export class MockFlightService {
    getFlights(): Flight[] {
        return [
            new Flight('Test-1234', 'TestFrom', 'TestTo', 250, AirplaneType.Boeing_737),
            new Flight('Test-5678', 'TestFrom', 'TestTo', 100, AirplaneType.Airbus_A320)
        ];
    }
}