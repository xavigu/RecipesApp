import {
  Component,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
  ViewChild,
} from '@angular/core'
import { DataStorageService } from '../shared/data-storage.service'
import { AuthService, Role } from '../auth/auth.service'
import { User } from '../auth/user.model'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { PlaceholderDirective } from '../shared/placeholder.directive'
import { AlertService } from '../shared/alert/alert.service'

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
  private closeSub: Subscription

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((userData) => {
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
    this.dataStorageService.storeRecipes()
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe(
      (res) => console.log('Fetch response: ', res),
      () => {
        this.alertService.showErrorAlert(
          'There is not recipes in the database',
          this.alertHost
        )
      }
    )
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
