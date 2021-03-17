import { Action } from '@ngrx/store'
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[RECIPE] SET RECIPES'

export class SetRecipes implements Action {
  readonly type = SET_RECIPES

  constructor(public payload: Recipe[]){}
}


export type RecipeActions =  SetRecipes ;
