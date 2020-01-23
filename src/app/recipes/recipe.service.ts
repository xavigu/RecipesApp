import { Injectable, EventEmitter, Output } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  @Output() recipeItemSelected = new EventEmitter<Recipe>();
  //Array de recipes object
  private recipes: Recipe[] = [
    new Recipe('A test recipe', 'Simply a test', 'https://cdn.apartmenttherapy.info/image/upload/v1567541461/k/Photo/Recipes/2019-09-how-to-shrimp-alfredo/HT-Shrimp-Alfredo_103.jpg'),
    new Recipe('A new test recipe', 'Simply a test', 'https://cdn.apartmenttherapy.info/image/upload/v1567541461/k/Photo/Recipes/2019-09-how-to-shrimp-alfredo/HT-Shrimp-Alfredo_103.jpg'),
  ]; 

  constructor() { }

  getRecipes(){
    return this.recipes.slice(); 
    //Usamos slice para no manejar el array recipes desde fuera, solamente obtener una copia
  }
}
