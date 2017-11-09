import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { FlightListComponent } from "./flight-list.component";
import { FlightDetailComponent } from "./flight-detail/flight-detail.component";
import { FlightSearchPipe } from "../pipes/flight-search.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlightService } from "./flight-service";
import { Flight } from "../model/Flight";
import { PassengerFormComponent } from "./passenger-form/passenger-form";
import { AirplaneType } from "../model/AirplaneType";
import { Passenger } from "../model/Passenger";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('FlightListComponent', () => {
    let fixture: ComponentFixture<FlightListComponent>;
    let component: FlightListComponent;

    beforeEach(async(() => {
        const testBed = TestBed.configureTestingModule({
            declarations: [
                FlightListComponent,
                FlightDetailComponent,
                FlightSearchPipe,
                PassengerFormComponent,
            ],
            imports: [
                FormsModule, ReactiveFormsModule
            ]
        })

        fixture = testBed.createComponent(FlightListComponent);
        component = fixture.componentInstance;
    }));

    it('should have 4 flights', () => {
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.flights.length).toBe(4);
    });

    it('should display 4 flights and display an added flight', () => {
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.innerHTML.indexOf('Brussels Airlines') > -1).toBeTruthy();
        expect(fixture.debugElement.nativeElement.innerHTML.indexOf('Delta') > -1).toBeTruthy();
        expect(fixture.debugElement.nativeElement.innerHTML.indexOf('Lufthansa') > -1).toBeTruthy();

        component.flights.push(new Flight('Ryanair', 'Tokyo', 'Charleroi', 600, AirplaneType.Boeing_747));
        
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.innerHTML.indexOf('Ryanair') > -1).toBeTruthy();
    });

    it('should add a passenger', () => {
        component.ngOnInit();
        fixture.detectChanges();

        const flightId: number = component.flights[0].id;
        const passenger: Passenger = new Passenger('Firstname', 'Lastname');

        const flight: Flight = component.flights[0];

        component.enableBooking(flightId);
        flight.addPassenger(passenger);

        fixture.detectChanges();

        const row:DebugElement = fixture.debugElement.query(By.css('#passenger_' + passenger.id));
        
        expect(row.nativeElement.innerHTML.indexOf('Firstname') > - 1).toBeTruthy();
        expect(row.nativeElement.innerHTML.indexOf('Lastname') > - 1).toBeTruthy();  
      });
});