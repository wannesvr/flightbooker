import { Flight } from "../../model/Flight";
import { AirplaneType } from "../../model/AirplaneType";

export class MockFlightService {
    getFlights(): Flight[] {
        return [
            new Flight('Test-1234', 'TestFrom', 'TestTo', 250, AirplaneType.Boeing_737),
            new Flight('Test-5678', 'TestFrom', 'TestTo', 100, AirplaneType.Airbus_A320)
        ];
    }
}