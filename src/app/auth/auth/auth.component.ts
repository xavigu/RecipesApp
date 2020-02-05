import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogging = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLogging = !this.isLogging;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (this.isLogging) {
      this.isLoading = false;
      // ...
    } else {
      this.authService.signup(email, password)
        .subscribe(data => {
          console.log(data);
          this.isLoading = false;
        }, errorMessage => {
          // This logic is better add in auth.service with catchError operator and throwError to convert to an observable (with the first subscribe you are observing the error)
          this.error = errorMessage;
          this.isLoading = false;
        })
    }
    form.reset();
  }

}
