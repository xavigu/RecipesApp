import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogging = true;
  isLoading = false;
  error: string = null;
  //le pasamos el placeholder directive como type y viewChild buscara la primera ocurrencia de esta directiva en el DOM
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver :ComponentFactoryResolver) { }

  ngOnInit() {
  }
  //true when you are in login mode, false when you are in sign up mode
  onSwitchMode() {
    this.isLogging = !this.isLogging;
    console.log(this.isLogging);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLogging) {
      this.isLoading = false;
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    };

    authObs.subscribe(data => {
      console.log("Observable auth requests:", data);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      // This logic is better add in auth.service with catchError operator and throwError to convert to an observable 
      // (with the first subscribe you are observing the error)
      this.error = errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    });

    form.reset();
  };
  
  // closeModal(){
  //   this.error = null;
  // }

  private showErrorAlert(message: string){
    const alertCmpFactory =  this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    //limpia todo el contenido que pueda ver en el container antes de añadir el alert component
    hostViewContainerRef.clear();
    //Referencia al alert component
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    //Instancia del component pudiendo user las properties(variables) del alert component
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })

  }

}
