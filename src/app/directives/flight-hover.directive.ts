import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[flightHover]' })
export class FlightHoverDirective {
    @Input('flightHover') flightHover: string;

    constructor(private element: ElementRef) {
        this.element.nativeElement.style.transition = '1s';        
    }

    @HostListener('mouseover')
    onHover() {
        this.element.nativeElement.style.transform = 'scale(1.2)';
    }

    @HostListener('mouseleave')    
    onUnhover() {
        this.element.nativeElement.style.transform = 'scale(1.0)';        
    }
}