import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Passenger } from '../../model/Passenger';

@Component({
    selector: 'passenger-form',
    templateUrl: 'passenger-form.component.html'
})

export class PassengerFormComponent implements OnInit {
    @Output() public onAddPassenger: EventEmitter<Passenger>;
     
    public form: FormGroup;

    constructor(private formBuilder:FormBuilder) {
        this.onAddPassenger = new EventEmitter();

        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
     });
     }

    ngOnInit() { }

    addPassenger() {
        if (this.form.valid){
            const firstName = this.form.get('firstName')!.value;
            const lastName = this.form.get('lastName')!.value;

            const passenger: Passenger = new Passenger(firstName, lastName);
          
            this.onAddPassenger.emit(passenger);
        } 
    }
}