// import { FlightService } from './flight-service';
// import { Flight } from '../model/Flight';
// import { AirplaneType } from '../model/AirplaneType';

// describe('FlightService', () => {
//     let service: FlightService;

//     beforeEach(() => {
//         service = new FlightService();
//     });

//     describe('getFlights', () => {
//         it('should return 4 flights', () => {
//             const result:Flight[] = service.getFlights();

//             expect(result.length).toBe(4);
//             expect(result[0]).toEqual(new Flight('Brussels Airlines', 'Zaventem', 'Istanbul', 500, AirplaneType.Airbus_A380));
//             expect(result[1]).toEqual(new Flight('Brussels Airlines', 'Zaventem', 'London', 100, AirplaneType.Airbus_A320));
//             expect(result[2]).toEqual(new Flight('Delta', 'New York', 'Manhattan', 150, AirplaneType.Boeing_737));
//             expect(result[3]).toEqual(new Flight('Lufthansa', 'Tokyo', 'Charleroi', 600, AirplaneType.Boeing_747));
//         });
//     });
// });