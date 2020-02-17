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
        //solo se subscribe al fetchRecipes que hace el get del backend si el array de las Recipes esta a 0 
        //para poder cargar la URL de una receta en concreto aunque no esten cargadas las recipes
        if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes(); //No hace falta que se subscriba porque el metodo resolve hace esa función
        } else {
            return recipes; //No hace el fetch de nuevo porque ya tiene cargadas las recetas y asi te permite editar una receta
                            //(sino cargaría el fetchRecipes de nuevo y el edit no se llevaría a cabo)
        }       
    }
}

