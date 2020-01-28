import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 20),
    new Ingredient('Tomatoes', 15),
    new Ingredient('Oranges', 2),
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }
  //Cuando se da al boton de Add se añade el nuevo ingrediente al array de Ingredientes
  //Y usando el EventEmitter se pasa una copia de este array que recogera el shopping-list
  //component para pintar los ingredientes
  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); //Se hace push de los nuevos ingredientes a nuestro array de ingredients
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
