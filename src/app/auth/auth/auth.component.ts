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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode(){
    this.isLogging = !this.isLogging;
  }

  onSubmit(form: NgForm){
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLogging) {
      // ...
    } else {
      this.authService.signup(email, password)
           .subscribe(data => {
             console.log(data);
           }, error => {
             console.log('Cant sign up: ', error.message);
           })      
    }
    form.reset();
  }

}
