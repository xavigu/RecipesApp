import { Injectable } from '@angular/core'
import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()
  // Array de recipes object
  private recipes: Recipe[] = []

  constructor(private shopService: ShoppingListService) {}

  // Function to overwrite recipes array when we fetch Data
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
    // Emitimos una copia de las nuevas recipes para que todos los que esten subscritos lo sepan
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice()
    // Usamos slice para manejar una copia del array recipes desde fuera
  }

  getRecipe(id: number) {
    return this.recipes[id]
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice())
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shopService.addIngredients(ingredients)
  }
}
