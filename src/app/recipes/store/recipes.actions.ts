import { Action } from '@ngrx/store'
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[RECIPE] SET RECIPES'

export const FETCH_RECIPES = '[RECIPE] FETCH RECIPES'
export const STORE_RECIPES = '[RECIPE] STORE RECIPES'

export const ADD_RECIPE = '[RECIPE] ADD RECIPE'
export const UPDATE_RECIPE = '[RECIPE] UPDATE RECIPE'
export const DELETE_RECIPE = '[RECIPE] DELETE RECIPE'

export class SetRecipes implements Action {
  readonly type = SET_RECIPES

  constructor(public payload: Recipe[]){}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES
}
export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE

  constructor(public payload: Recipe){}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE

  constructor(public payload: {index: number, newRecipe: Recipe}){}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE

  constructor(public payload: number){}
}



export type RecipeActions =  SetRecipes | FetchRecipes | StoreRecipes | AddRecipe | UpdateRecipe | DeleteRecipe;
