import { Action } from '@ngrx/store'
import { Ingredient } from '../../shared/ingredient.model'

export const ADD_INGREDIENT = '[SHOPPING-LIST] ADD INGREDIENT'

export class AddIngredient implements Action {
  // readonly to can not change from outside
  readonly type = ADD_INGREDIENT

  constructor(public payload: Ingredient) {}
}

export type ShoppingListActions = AddIngredient
