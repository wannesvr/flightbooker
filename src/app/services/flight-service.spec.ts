import { FlightService } from './flight-service';
import { Flight } from '../model/Flight';
import { AirplaneType } from '../model/AirplaneType';

describe('FlightService', () => {
    let service: FlightService;

    beforeEach(() => {
        service = new FlightService();
    });

    describe('getFlights', () => {
        it('should return 4 flights', () => {
            const result:Flight[] = service.getFlights();
            const expectedResult = [
                new Flight('Brussels Airlines', 'Zaventem', 'Istanbul', 500, AirplaneType.Airbus_A380),
                new Flight('Brussels Airlines', 'Zaventem', 'London', 100, AirplaneType.Airbus_A320),
                new Flight('Delta', 'New York', 'Manhattan', 150, AirplaneType.Boeing_737),
                new Flight('Lufthansa', 'Tokyo', 'Charleroi', 600, AirplaneType.Boeing_747)
            ]

            expect(result.length).toBe(4);
            expect(compareFlights(result[0], expectedResult[0])).toBeTruthy();
            expect(compareFlights(result[1], expectedResult[1])).toBeTruthy();
            expect(compareFlights(result[2], expectedResult[2])).toBeTruthy();
            expect(compareFlights(result[3], expectedResult[3])).toBeTruthy();
        });
    });

    // Primitive and not correct 'equals' function
    const compareFlights = (first: Flight, second: Flight) => {
        return first.name === second.name && 
            first.from === second.from &&
            first.price === second.price;
    }
});