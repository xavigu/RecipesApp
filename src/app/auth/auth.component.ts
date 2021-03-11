import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core'
import { NgForm } from '@angular/forms'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { AuthService, AuthResponseData } from './auth.service'
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive'
import { AlertService } from '../shared/alert/alert.service'
import * as fromApp  from '../store/app.reducer'
import * as AuthActions from './store/auth.actions'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    trigger('authFadeIn', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-200px)',
        }),
        animate(500),
      ]),
    ]),
  ],
})
export class AuthComponent implements OnInit {
  isLogging = true
  isLoading = false
  error: string = null
  // le pasamos el placeholder directive como type y viewChild buscara la primera ocurrencia de esta directiva en el DOM
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.alertService.showErrorAlert(this.error, this.alertHost)
      }
    })
  }
  // true when you are in login mode, false when you are in sign up mode
  onSwitchMode() {
    this.isLogging = !this.isLogging
    console.log(this.isLogging)
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const email = form.value.email
    const password = form.value.password
    let authObs: Observable<AuthResponseData>

    this.isLoading = true

    if (this.isLogging) {
      // authObs = this.authService.login(email, password)
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}))
    } else {
      authObs = this.authService.signup(email, password)
    }

    // authObs.subscribe(
    //   (data) => {
    //     this.isLoading = false
    //     this.router.navigate(['/recipes'])
    //   },
    //   (errorMessage) => {
    //     // This logic is better add in auth.service with catchError operator and throwError to convert to an observable
    //     // (with the first subscribe you are observing the error)
    //     this.error = errorMessage
    //     this.alertService.showErrorAlert(errorMessage, this.alertHost)
    //     this.isLoading = false
    //   }
    // )

    form.reset()
  }
}
