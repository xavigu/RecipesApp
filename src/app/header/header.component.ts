import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth/auth.service';
import { User } from '../auth/auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  private userSub: Subscription;
  isAuthenticated = false;
  authUser: User;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(userData => {
      this.isAuthenticated = !!userData; //Si no esta autenticado el user, la userData devuelta sería igual a null igual a (!userData ? false : true)
    })
    
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
