import { ComponentFixture, async, TestBed, inject } from "@angular/core/testing";
import { DebugElement, Injector } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NO_ERRORS_SCHEMA } from "@angular/compiler/src/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FlightListComponent } from "./flight-list.component";
import { FlightDetailComponent } from "../flight-detail/flight-detail.component";
import { FlightSearchPipe } from "../../pipes/flight-search.pipe";
import { FlightService } from "../../services/flight-service";
import { Flight } from "../../model/flight";
import { PassengerFormComponent } from "../passenger-form/passenger-form";
import { AirplaneType } from "../../model/airplane-type";
import { Passenger } from "../../model/passenger";

import { MockFlightService } from "../../services/mocks/flight-service.mock";

describe('FlightListComponent', () => {
    let fixture: ComponentFixture<FlightListComponent>;
    let component: FlightListComponent;
    let service: FlightService;
    
    beforeEach(async(() => {
        /**
         * Create a testing module for the flight-list component
         * All components FlightListComponent requires are added to the declarations array.
         * All external modules it requires are added to the imports array.
         * All providers it requires are configured in the providers array.
         */
        const testBed = TestBed.configureTestingModule({
            declarations: [
                FlightListComponent,
                FlightDetailComponent,
                FlightSearchPipe,
                PassengerFormComponent,
            ],
            imports: [
                FormsModule, ReactiveFormsModule
            ],
          
            providers: [{
                provide: FlightService,
                useFactory: () => {
                    return new MockFlightService()
                }
                // You can also use 'useClass' instead of 'useFactory'
                //, useClass: MockFlightService
            }],

            // Use if you want to do a shallow integration test
            //schemas: [NO_ERRORS_SCHEMA]
            
        });

        // Create the ComponentFixture
        fixture = testBed.createComponent(FlightListComponent);

        // Access the actual component instance
        component = fixture.componentInstance;

        // Retrieve the MockFlightService instance so we can spy on it
        service = <FlightService> testBed.get(FlightService);
    }));

    it('should have 2 flights', () => {
        // Spy on the getFlights method and call through 
        // so we can see it was really called
        const spy: jasmine.Spy = spyOn(service, 'getFlights').and.callThrough();

        // ngOnInit of the FlightListComponent calls the FlightService's getFlights() method.
        component.ngOnInit();

        // We have to manually check for changes, 
        // or use fixture.autoDetectChanges(); and  
        // fixture.whenStable().then(() => { expect(...) })
        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
        expect(component.flights.length).toBe(2);
    });

    it('should display 2 flights and display an added flight', () => {
        component.ngOnInit();
        fixture.detectChanges();

        // Access the html of the component and check if it contains the flight's names.
        expect(fixture.debugElement.nativeElement.innerHTML.indexOf('Test-1234') > -1).toBeTruthy();
        expect(fixture.debugElement.nativeElement.innerHTML.indexOf('Test-5678') > -1).toBeTruthy();

        // Add a new flight to the array
        component.flights.push(new Flight('Ryanair', 'Tokyo', 'Charleroi', 600, AirplaneType.Boeing_747));

        // Make sure Angular processes the changes and updates the html
        fixture.detectChanges();

        // Check if the flight is shown in html
        expect(fixture.debugElement.nativeElement.innerHTML.indexOf('Ryanair') > -1).toBeTruthy();
    });

    /**
     * Tests whether an added passenger is displayed in the component's template
     */
    it('should add a passenger', () => {
        component.ngOnInit();
        fixture.detectChanges();

        const passenger: Passenger = new Passenger('Firstname', 'Lastname');
        const flight: Flight = component.flights[0];

        // Enable booking on the flight (required to add the passenger)
        component.enableBooking(flight.id);

        // Add the passenger to the flight
        flight.addPassenger(passenger);

        fixture.detectChanges();

        // Fetch the added passenger's table row by its id
        const row: DebugElement = fixture.debugElement.query(By.css('#passenger_' + passenger.id));

        // Check whether the table row contains 'Firstname' and 'Lastname'
        expect(row.nativeElement.innerHTML.indexOf('Firstname') > - 1).toBeTruthy();
        expect(row.nativeElement.innerHTML.indexOf('Lastname') > - 1).toBeTruthy();
    });

    // Example on how to inject and mock a service into a suite
    describe('when flighservice returns 1 flight', () => {
        /**
         * Use the Angular inject method to inject the flightservice
         * but spy on the getFlights method and return a static value
         */
        beforeEach(inject([FlightService], (flightService: FlightService) => {
            spyOn(flightService, 'getFlights').and.returnValue(
                [
                    new Flight('Test-1234', 'TestFrom', 'TestTo', 250, AirplaneType.Boeing_737),
                ])
        }));

        // Shows that the inject above is working by expecting just one flight
        // instead of the two provided by the normal MockFlightService
        it('should have 1 flight', () => {
            component.ngOnInit();
            fixture.detectChanges();

            expect(component.flights.length).toBe(1);
        });
    })
});