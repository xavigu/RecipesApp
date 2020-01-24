import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';


const routes: Routes = [
  {
    path: "recipes",
    component: RecipesComponent,
    children: [
      { path: "", component: RecipeStartComponent },
      { path: "new", component: RecipeDetailComponent },
      { path: ":id", component: RecipeDetailComponent },
      { path: ":id/edit", component: RecipeDetailComponent }
    ]
  },
  { path: "shopping-list", component: ShoppingListComponent },
  { path: "", redirectTo: "/recipes", pathMatch: "full" } //Te redirija a /recipes si el path entero es vacio
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //Le pasamos nuestro array de rutas para configurar el router module de Angular
  exports: [RouterModule] //Para tener esto en nuetro main module(app.module) deberemos exportarlo(Lo que se importa dentro del app.module es la class)
})

export class AppRoutingModule { }
