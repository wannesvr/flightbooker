 import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../../model/Flight';
 
 @Component({
     selector: 'flight-detail',
     templateUrl: 'flight-detail.component.html'
 })
 
 export class FlightDetailComponent implements OnInit {
     @Input() flight: Flight;
     
     constructor() { }
 
     ngOnInit() { }
 }