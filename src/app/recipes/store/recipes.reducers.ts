import { Recipe } from '../recipe.model';
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  RecipeActions,
  SET_RECIPES,
  UPDATE_RECIPE,
} from './recipes.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipeReducer(
  state: State = initialState,
  action: RecipeActions
) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case UPDATE_RECIPE:
      const updateRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe,
      };

      const updateRecipes = [...state.recipes];
      updateRecipes[action.payload.index] = updateRecipe;
      return {
        ...state,
        recipes: updateRecipes,
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe, recipeIndex) => recipeIndex !== action.payload
        ),
      };
    default:
      return state;
  }
}
