import { Ingredient } from '../../shared/ingredient.model'
import { ADD_INGREDIENT, ADD_INGREDIENTS, DELETE_INGREDIENT, ShoppingListActions, UPDATE_INGREDIENT } from './shopping-list.actions'

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}
export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 20),new Ingredient('Tomatoes', 15), new Ingredient('Oranges', 2)],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions
) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      }
      // copy of the ingredients array to dont modify directly from the state
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient
      return {
        ...state,
        ingredients: updatedIngredients
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, ingrIndex) => ingrIndex !== action.payload)
      };
    default:
      return state
  }
}
