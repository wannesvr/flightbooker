import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../model/flight';

@Pipe({
    name: 'search'
})
export class FlightSearchPipe implements PipeTransform {

    transform(value: Flight[], ...args: any[]) {
        if (!args[0]) {
            return value;
        }

        return value.filter((flight) => {
            return flight.name.toLowerCase().indexOf(args[0].toLowerCase()) !== -1;
        });
    }
}