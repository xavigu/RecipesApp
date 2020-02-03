import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';


@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) { }
    //Nos subscribimos directamente en el metodo que hace la put request porque no estamos interesados en la respuesta
    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://ng-course-recipeapp.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    };
    //Realizamos el subscribe porque la respuesta puede interesar al recipeService que es que maneja las recipes
    fetchRecipes(){
        this.http.get<Recipe[]>('https://ng-course-recipeapp.firebaseio.com/recipes.json')
            .subscribe((recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }) 
    }

}
