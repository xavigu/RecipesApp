import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];
  private ingSubscription: Subscription;

  constructor(private shopService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shopService.getIngredients();

    this.ingSubscription = this.shopService.ingredientsChanged
                                            .subscribe((ingredients: Ingredient[]) => {
                                              this.ingredients = ingredients;
                                            });
  }

  onEditItem(idx: number){
    this.shopService.startEditing.next(idx);
  }

  ngOnDestroy(): void {
    this.ingSubscription.unsubscribe(); 
  }
}
