import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

/**
 * Example of a structural directive.
 */
@Directive({ selector: '[showFlag]' })
export class ShowFlagDirective {

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

    /**
     * The directive will show a flag if the flightName equals Delta.
     */
    @Input('showFlag') set directive(flightName: string) {
        if (flightName === 'Delta') {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
    
}