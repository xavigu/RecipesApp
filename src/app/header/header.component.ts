import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService, Role } from '../auth/auth.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  private userSub: Subscription;
  isAuthenticated = false;
  isAdmin: boolean;
  collapsed = false;
  authUser: User;

  //Este elemento hace referencia a la directiva añadida en el DOM
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private dataStorageService: DataStorageService, 
              private authService: AuthService, 
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver){}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(userData => {
      this.isAuthenticated = !!userData; //Si no esta autenticado el user, la userData devuelta sería igual a null igual a (!userData ? false : true)
      if (this.isAuthenticated) { //Si esta autenticado comprobamos si el email corresponde al del admin para mostrar la opcion de guardar data
        this.isAdmin = (userData.email == Role.ADMIN) ? true : false        
      }
    });
  }

  onCollapsed(){
    this.collapsed = !this.collapsed;
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes()
    .subscribe(
      res => console.log('Fetch response: ', res), 
      () => {
        this.showErrorAlert('There is not recipes in the database');
      });
  }

  onLogout(){
    this.authService.logout();
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
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

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
