import { Route } from "@angular/router";
import { FlightListComponent } from "./components/flight-list/flight-list.component";
import { FlightCancelComponent } from "./components/flight-cancel-form/flight-cancel-component";

const routes: Route[] = [
    { path: '', redirectTo: 'flights', pathMatch: 'full' },
    { path: 'flights', component: FlightListComponent },
    { path: 'flights/cancel/:flightId/:passengerId', component: FlightCancelComponent },
    { path: 'zone',  component: NgZoneDemo },
]

export default routes;