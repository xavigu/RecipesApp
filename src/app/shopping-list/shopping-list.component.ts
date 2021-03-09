import { Component, OnInit } from '@angular/core'
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service'
import { Observable } from 'rxjs'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('itemFadeIn', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        // from no existing to any state
        style({
          // add a start state
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(500),
      ]),
      transition('* => void', [
        // Add a final state
        animate(
          500,
          style({
            opacity: 0,
            transform: 'translateX(100px)',
          })
        ),
      ]),
    ]),
  ],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[]
  ingredients$: Observable<{ ingredients: Ingredient[]}>

  constructor(private shopService: ShoppingListService, private store: Store<{shoppingList: { ingredients: Ingredient[]}}>) {}

  ngOnInit() {
    this.ingredients$ = this.store.select('shoppingList')

    // this.ingredients = this.shopService.getIngredients()
    // this.ingSubscription = this.shopService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients
    //   }
    // )
  }

  onEditItem(idx: number) {
    this.shopService.startEditing.next(idx)
  }

  // ngOnDestroy(): void {
  //   this.ingSubscription.unsubscribe()
  // }
}
