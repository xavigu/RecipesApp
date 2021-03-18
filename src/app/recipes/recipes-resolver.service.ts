import { Injectable } from '@angular/core'
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { take } from 'rxjs/operators'

import { Recipe } from './recipe.model'
import * as fromApp from '../store/app.reducer'
import * as RecipesActions from '../recipes/store/recipes.actions'


@Injectable({ providedIn: 'root' })
// utiliza la interface Resolve y hay que definir el tipo de data que va a resolver
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new RecipesActions.FetchRecipes());
    console.log('resolve')
    return this.actions$.pipe(
      ofType(RecipesActions.SET_RECIPES),
      take(1)
    )
  }
}
