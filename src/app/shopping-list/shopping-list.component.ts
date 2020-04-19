import { Component, OnInit, OnDestroy } from '@angular/core'
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service'
import { Subscription } from 'rxjs'
import { trigger, state, style, transition, animate } from '@angular/animations'

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
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[]
  private ingSubscription: Subscription

  constructor(private shopService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shopService.getIngredients()

    this.ingSubscription = this.shopService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    )
  }

  onEditItem(idx: number) {
    this.shopService.startEditing.next(idx)
  }

  ngOnDestroy(): void {
    this.ingSubscription.unsubscribe()
  }
}
