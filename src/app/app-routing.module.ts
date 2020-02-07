import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth/auth.component';


const appRoutes: Routes = [  
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, //Te redirija a /recipes si el path entero es vacio
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], //Le pasamos nuestro array de rutas para configurar el router module de Angular
  exports: [RouterModule] //Para tener esto en nuetro main module(app.module) deberemos exportarlo(Lo que se importa dentro del app.module es la class)
})

export class AppRoutingModule { }
