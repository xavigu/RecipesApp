import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators'


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
    fetchRecipes() {
       return this.http.get<Recipe[]>('https://ng-course-recipeapp.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => { //JS Method para mapear el array Recipes y modificar su contenido
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    //el spread operator(...) es para copiar toda la data existente y mira si existe el recipe.ingredients y si no crea para esa variable un empty array
                });
            }),
             tap(recipes =>{
                 this.recipeService.setRecipes(recipes);
             })  //tap operator permite ejecutar un codigo sin alterar la data que esta siendo funneled a traves del observable
            )
    }
}
// .subscribe((recipes: Recipe[]) => {
//     this.recipeService.setRecipes(recipes);
// })

