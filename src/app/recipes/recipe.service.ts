import { Injectable, EventEmitter, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  @Output() recipeItemSelected = new EventEmitter<Recipe>();
  //Array de recipes object
  private recipes: Recipe[] = [
    new Recipe(
      'Tacos', 
      'Best Tacos Ever', 
      'https://scm-assets.constant.co/scm/unilever/e9dc924f238fa6cc29465942875fe8f0/da9dcad5-93e1-41bf-b846-95e9c93a2632.jpg',
      [
        new Ingredient('Tortillas', 1),
        new Ingredient('Carne', 5),
        new Ingredient('Frijoles', 20)
      ]
      ),
    new Recipe(
      'Burguer', 
      'Best Burguer Ever', 
      'https://ep01.epimg.net/elpais/imagenes/2019/09/06/estilo/1567761729_884026_1567762022_noticia_normal.jpg',
      [
        new Ingredient('Tortillas', 1),
        new Ingredient('Carne', 5),
        new Ingredient('Frijoles', 20)
      ]
      )
    ]; 

  constructor(private shopService: ShoppingListService) { }

  getRecipes(){
    return this.recipes.slice(); 
    //Usamos slice para no manejar el array recipes desde fuera, solamente obtener una copia
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shopService.addIngredients(ingredients);
  }

}
