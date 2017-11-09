import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Passenger } from '../../model/Passenger';

/**
 * A component that displays a form with some validation to the user 
 * and fires an event (onAddPassenger) when the form is submitted.
 */
@Component({
    selector: 'passenger-form',
    templateUrl: 'passenger-form.component.html'
})

export class PassengerFormComponent {
    // EventEmitter will allow us to fire an event upwards to the parent component(s).
    @Output() public onAddPassenger: EventEmitter<Passenger>;
     
    public form: FormGroup;

    constructor(private formBuilder:FormBuilder) {
        this.onAddPassenger = new EventEmitter();

        // Build a form that consist of 2 fields. Both fields are required,
        // lastName requires a minimum length of 1.
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', [Validators.required, Validators.minLength(1)]]
     });
     }

    /**
     * Fires an event that exists of the passenger object.
     * An example event would look like this: 
     * {
     *   firstName: "A first name",
     *   lastName: "A last name"
     * }
     */
    addPassenger() {
        if (this.form.valid){
            const firstName = this.form.get('firstName')!.value;
            const lastName = this.form.get('lastName')!.value;

            const passenger: Passenger = new Passenger(firstName, lastName);
          
            this.onAddPassenger.emit(passenger);
        } 
    }
}