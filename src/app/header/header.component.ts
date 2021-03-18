import {
  Component,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
  ViewChild,
} from '@angular/core'
import { Store } from '@ngrx/store'
import { map } from 'rxjs/operators'
import { Subscription } from 'rxjs'

import { Role } from '../auth/auth.service'
import { User } from '../auth/user.model'
import { PlaceholderDirective } from '../shared/placeholder.directive'
import { AlertService } from '../shared/alert/alert.service'

import * as fromApp from '../store/app.reducer'
import * as AuthActions from '../auth/store/auth.actions'
import * as RecipeActions from '../recipes/store/recipes.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription
  isAuthenticated = false
  isAdmin: boolean
  collapsed = false
  authUser: User

  // Este elemento hace referencia a la directiva añadida en el DOM
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective

  constructor(
    private alertService: AlertService,
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe((userData) => 
    {
      this.isAuthenticated = !!userData // Si no esta autenticado el user, la userData devuelta sería igual a null igual a (!userData ? false : true)
      if (this.isAuthenticated) {
        // Si esta autenticado comprobamos si el email corresponde al del admin para mostrar la opcion de guardar data
        this.isAdmin = userData.email === Role.ADMIN ? true : false
      }
    })
  }

  onCollapsed() {
    this.collapsed = !this.collapsed
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
    // this.dataStorageService.storeRecipes()
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
    // this.dataStorageService.fetchRecipes().subscribe(
    //   (res) => console.log('Fetch response: ', res),
    //   () => {
    //     this.alertService.showErrorAlert(
    //       'There is not recipes in the database',
    //       this.alertHost
    //     )
    //   }
    // )
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout())
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
