import { Recipe } from "../recipe.model";
import { RecipeActions, SET_RECIPES } from "./recipes.actions";

export interface State {
  recipes: Recipe[]

}

const initialState: State = {
  recipes: []
};

export function recipeReducer(state: State = initialState, action: RecipeActions) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    default:
      return state
  }
}
