import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[flightHover]' })
export class FlightHoverDirective {

    constructor(private element: ElementRef) {
        this.element.nativeElement.style.transition = '0.2s';        
    }

    @HostListener('mouseover')
    onHover() {
        this.element.nativeElement.style.transform = 'scale(1.05)';
    }

    @HostListener('mouseleave')    
    onUnhover() {
        this.element.nativeElement.style.transform = 'scale(1.0)';        
    }
}