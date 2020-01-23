import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shopService: ShoppingListService) { }

  ngOnInit() {
  }

  addIngredient(nameInput: HTMLInputElement, amountInput: HTMLInputElement){
    const ingName = nameInput.value;
    const ingAmount = Number(amountInput.value);
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.shopService.addIngredient(newIngredient);
  }

}
