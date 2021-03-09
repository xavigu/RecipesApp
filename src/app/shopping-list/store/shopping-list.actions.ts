import { Action } from '@ngrx/store'
import { Ingredient } from '../../shared/ingredient.model'

export const ADD_INGREDIENT = '[SHOPPING-LIST] ADD INGREDIENT'
export const ADD_INGREDIENTS = '[SHOPPING-LIST] ADD INGREDIENTS'

export class AddIngredient implements Action {
  // readonly to can not change from outside
  readonly type = ADD_INGREDIENT

  constructor(public payload: Ingredient) {}
}
export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS

  constructor(public payload: Ingredient[]) {}
}

export type ShoppingListActions = AddIngredient | AddIngredients
