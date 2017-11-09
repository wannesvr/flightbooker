import { Flight } from "../model/Flight";
import { AirplaneType } from "../model/AirplaneType";

export class FlightService {
    getFlights() : Flight[] {
        let flights:Flight[] = [];

        flights.push(new Flight('Brussels Airlines', 'Zaventem', 'Istanbul', 500, AirplaneType.Airbus_A380));
        flights.push(new Flight('Brussels Airlines', 'Zaventem', 'London', 100, AirplaneType.Airbus_A320));
        flights.push(new Flight('Delta', 'New York', 'Manhattan', 150, AirplaneType.Boeing_737));
        flights.push(new Flight('Lufthansa', 'Tokyo', 'Charleroi', 600, AirplaneType.Boeing_747));
        
        return flights;
    }
}
