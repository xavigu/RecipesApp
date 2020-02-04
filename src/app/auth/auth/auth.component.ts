import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogging = true;

  constructor() { }

  ngOnInit() {
  }

  onSwitchMode(){
    this.isLogging = !this.isLogging;
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    form.reset();
  }

}
