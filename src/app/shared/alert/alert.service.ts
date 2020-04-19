import { Injectable, ComponentFactoryResolver } from '@angular/core'
import { AlertComponent } from './alert.component'
import { PlaceholderDirective } from '../placeholder.directive'
import { Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private closeSub: Subscription

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  showErrorAlert(message: string, host: PlaceholderDirective) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    )
    const hostViewContainerRef = host.viewContainerRef
    // limpia todo el contenido que pueda ver en el container antes de añadir el alert component
    hostViewContainerRef.clear()
    // Referencia al alert component
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)
    // Instancia del component pudiendo user las properties(variables) del alert component
    componentRef.instance.message = message
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe()
      hostViewContainerRef.clear()
    })
  }
}
