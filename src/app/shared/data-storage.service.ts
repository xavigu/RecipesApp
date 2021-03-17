import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Store } from '@ngrx/store'
import Swal from 'sweetalert2'
import { map, tap } from 'rxjs/operators'

import { RecipeService } from '../recipes/recipe.service'
import { Recipe } from '../recipes/recipe.model'
import * as fromApp from '../store/app.reducer'
import * as RecipeActions from '../recipes/store/recipes.actions'

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}
  // Nos subscribimos directamente en el metodo que hace la put request porque no estamos interesados en la respuesta
  storeRecipes() {
    const recipes = this.recipeService.getRecipes()
    if (recipes.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Sorry!',
        text: 'No recipes to save, Fetch Data first or Add New Recipe',
      })
      return
    } else {
      return this.http
        .put('https://ng-course-recipeapp.firebaseio.com/recipes.json', recipes)
        .subscribe((response) => {
          console.log('Save Recipes Data:', response)
        })
    }
  }
  // Realizamos el subscribe porque la respuesta puede interesar al recipeService que es que maneja las recipes
  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://ng-course-recipeapp.firebaseio.com/recipes.json')
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            // JS Method para mapear el array Recipes y modificar su contenido
            return {
              // el spread operator(...) es para copiar toda la data existente y mira si existe el recipe.ingredients y si no crea para esa variable un empty array
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            }
          })
        }),
        tap((recipes) => {
          this.store.dispatch(new RecipeActions.SetRecipes(recipes))
          // this.recipeService.setRecipes(recipes)
        }) // tap operator permite ejecutar un codigo sin alterar la data que esta siendo funneled a traves del observable)
      )
  }
}
