import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Role } from '../auth/auth.service';
import { User } from '../auth/user.model';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipes.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  isAdmin: boolean;
  collapsed = false;
  authUser: User;

  constructor(private store: Store<fromApp.AppState>, public translate: TranslateService) {
    translate.addLangs(['en', 'es']);
  }

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((userData) => {
        this.isAuthenticated = !!userData; // Si no esta autenticado el user, la userData devuelta sería igual a null igual a (!userData ? false : true)
        if (this.isAuthenticated) {
          // Si esta autenticado comprobamos si el email corresponde al del admin para mostrar la opcion de guardar data
          this.isAdmin = userData.email === Role.ADMIN ? true : false;
        }
      });
  }

  onCollapsed() {
    this.collapsed = !this.collapsed;
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
