import { AirplaneType } from "./airplane-type";
import { Passenger } from "./passenger";

/**
 * Class that holds information about a flight and provides a method to add a passenger to the flight.
 */
export class Flight {
    private static ID = 0;

    public id: number;
    public isBooking: boolean;
    public isFull: boolean;
    public seatsLeft: number;
    public date: Date;
    public passengers: Passenger[];

    constructor(
        public name: string,
        public from: string,
        public to: string,
        public price: number,
        public airplaneType: AirplaneType
    ) {
        this.id = Flight.ID++;
        this.date = new Date(2017, 10, 8);
        this.isBooking = false;
        this.isFull = false;
        this.passengers = [];

        switch (airplaneType) {
            case AirplaneType.Airbus_A320: this.seatsLeft = 4; break;
            case AirplaneType.Airbus_A380: this.seatsLeft = 8; break;
            case AirplaneType.Boeing_737: this.seatsLeft = 2; break;
            case AirplaneType.Boeing_747: this.seatsLeft = 6; break;
        }
    }

    static copy(flight: Flight) {
        const copy: Flight = new Flight(flight.name, flight.from, flight.to, flight.price, flight.airplaneType);
        copy.date = flight.date;
        copy.isBooking = flight.isBooking;
        copy.isFull = flight.isFull;
        copy.passengers = flight.passengers;
        copy.seatsLeft = flight.seatsLeft;
        copy.id = flight.id;

        return copy;
    }
}