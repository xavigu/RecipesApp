import { Directive, ElementRef, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

    //el ViewContainerRef te da información del lugar donde colocas la directiva
    //y tendras acceso a él a traves de utilizar @ViewChild en el componente que lo uses
    constructor(public viewContainerRef: ViewContainerRef) { 

    }

}