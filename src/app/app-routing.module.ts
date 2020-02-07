import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [  
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, //Te redirija a /recipes si el path entero es vacio
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], //Le pasamos nuestro array de rutas para configurar el router module de Angular
  exports: [RouterModule] //Para tener esto en nuetro main module(app.module) deberemos exportarlo(Lo que se importa dentro del app.module es la class)
})

export class AppRoutingModule { }
