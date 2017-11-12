import { FlightSearchPipe } from "./flight-search.pipe";
import { Flight } from "../model/flight";
import { AirplaneType } from "../model/airplane-type";

describe('FlightSearchPipe', () => {
    let pipe: FlightSearchPipe;

    beforeEach(() => {
        pipe = new FlightSearchPipe();
    });

    it('should return the array of flights if the value is undefined', () => {
        const expectedResult = [new Flight('Test', 'Test', 'Test', 0, AirplaneType.Boeing_737)];
        const result = pipe.transform(expectedResult, undefined);

        expect(result).toEqual(expectedResult);
    });
});