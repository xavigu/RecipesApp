import { Action } from '@ngrx/store'
import { Ingredient } from '../../shared/ingredient.model'

export const ADD_INGREDIENT = '[SHOPPING-LIST] ADD INGREDIENT'
export const ADD_INGREDIENTS = '[SHOPPING-LIST] ADD INGREDIENTS'
export const UPDATE_INGREDIENT = '[SHOPPING-LIST] UPDATE INGREDIENT'
export const DELETE_INGREDIENT = '[SHOPPING-LIST] DELETE INGREDIENT'
export const START_EDIT = '[SHOPPING-LIST] START EDIT'
export const STOP_EDIT = '[SHOPPING-LIST] STOP EDIT'

export class AddIngredient implements Action {
  // readonly to can not change from outside
  readonly type = ADD_INGREDIENT

  constructor(public payload: Ingredient) {}
}
export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS

  constructor(public payload: Ingredient[]) {}
}
export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT

  constructor(public payload: {index:number, ingredient: Ingredient}) {}
}
export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT

  constructor(public payload: number) {}
}
export class StartEdit implements Action {
  readonly type = START_EDIT

  constructor(public payload: number) {}
}
export class StopEdit implements Action {
  readonly type = STOP_EDIT
}

export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient  | DeleteIngredient | StartEdit | StopEdit
