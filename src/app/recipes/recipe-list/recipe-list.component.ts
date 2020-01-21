import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipe>();

  //Array de recipes object
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'Simply a test', 'https://cdn.apartmenttherapy.info/image/upload/v1567541461/k/Photo/Recipes/2019-09-how-to-shrimp-alfredo/HT-Shrimp-Alfredo_103.jpg'),
    new Recipe('A new test recipe', 'Simply a test', 'https://cdn.apartmenttherapy.info/image/upload/v1567541461/k/Photo/Recipes/2019-09-how-to-shrimp-alfredo/HT-Shrimp-Alfredo_103.jpg'),
  ]; 

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeSelected.emit(recipe);
  }

}
