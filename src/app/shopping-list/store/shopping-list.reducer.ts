import { Ingredient } from '../../shared/ingredient.model'
import { ADD_INGREDIENT, ShoppingListActions } from './shopping-list.actions'

export interface State {
  ingredients: Ingredient[]
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 20),
    new Ingredient('Tomatoes', 15),
    new Ingredient('Oranges', 2),
  ],
}

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions
) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      }
    default:
      return state
  }
}

// Arrow function que devuelve el valor de isAuthenticated del state
// export const getIsAuth = (state: State) => state.isAuthenticated;
