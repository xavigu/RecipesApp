import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})
//utiliza la interface Resolve y hay que definir el tipo de data que va a resolver
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ){
        const recipes = this.recipesService.getRecipes();
        //solo se subscribe al fetchRecipes que hace el get del backend
        //si el array de las Recipes esta a 0 porque no se ha fetcheado la data aun
        if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }       
    }
}

