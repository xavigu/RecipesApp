import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import Swal from 'sweetalert2'

import { Recipe } from "../recipe.model";

import * as RecipeActions from "./recipes.actions";
import * as fromApp from "../../store/app.reducer"

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http
      .get<Recipe[]>('https://ng-course-recipeapp.firebaseio.com/recipes.json')
    }),
    map((recipes) => {
      // TODO Meter logica de que muestre un error si no hay database de recipes
      // this.alertService.showErrorAlert(
      //   'There is not recipes in the database',
      //   this.alertHost
      // )
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        }
      })
    }),
    map(recipes => {
      return new RecipeActions.SetRecipes(recipes)
    })
  )

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    // array destructuring to get data from ofType and withLatestFrom operators
    switchMap(([actionData, recipesState]) => {
      const recipes = recipesState.recipes;
      if (recipes.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Sorry!',
          text: 'No recipes to save, Fetch Data first or Add New Recipe',
        })
        return
      } else {
        return this.http
          .put('https://ng-course-recipeapp.firebaseio.com/recipes.json', recipes)
      }
    })
  )

  constructor(private actions$: Actions, private http: HttpClient , private store: Store<fromApp.AppState>){}
}