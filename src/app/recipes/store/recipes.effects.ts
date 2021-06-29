import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Recipe } from '../recipe.model';

import * as RecipeActions from './recipes.actions';
import * as fromApp from '../../store/app.reducer';
import { PopupMessageService } from 'src/app/shared/popup-message.service';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>('https://ng-course-recipeapp.firebaseio.com/recipes.json');
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map((recipes) => {
      if (recipes) {
        return new RecipeActions.SetRecipes(recipes);
      }
      this.popupMessage.showBasicMessage('There is not recipes in the database');
      return { type: 'No recipes error effect' };
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    // array destructuring to get data from ofType and withLatestFrom operators
    switchMap(([actionData, recipesState]) => {
      const recipes = recipesState.recipes;
      if (recipes.length === 0) {
        this.popupMessage.showBasicMessage('No recipes to save, Fetch Data first or Add New Recipe', 'success');
        return;
      } else {
        return this.http.put('https://ng-course-recipeapp.firebaseio.com/recipes.json', recipes);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private popupMessage: PopupMessageService
  ) {}
}
