import { Component, OnInit } from '@angular/core';

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

}
