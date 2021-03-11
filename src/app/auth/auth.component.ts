import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core'
import { NgForm } from '@angular/forms'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Store } from '@ngrx/store'

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

    this.isLoading = true

    if (this.isLogging) {
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}))
    } else {
      this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}))
    }

    form.reset()
  }
}
