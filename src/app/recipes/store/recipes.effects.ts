import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";

import { Recipe } from "../recipe.model";

import * as RecipeActions from "./recipes.actions";

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

  constructor(private actions$: Actions, private http: HttpClient){}
}