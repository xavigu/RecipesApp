import { Action } from '@ngrx/store'
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[RECIPE] SET RECIPES'
export const FETCH_RECIPES = '[RECIPE] FETCH RECIPES'

export class SetRecipes implements Action {
  readonly type = SET_RECIPES

  constructor(public payload: Recipe[]){}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES
}


export type RecipeActions =  SetRecipes ;
