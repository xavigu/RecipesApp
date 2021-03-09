import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { Ingredient } from 'src/app/shared/ingredient.model'
import { ShoppingListService } from '../shopping-list.service'
import * as ShoppingList from '../store/shopping-list.actions'
import * as fromShoppingList from '../store/shopping-list.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm
  subscription: Subscription
  editMode = false
  editedItemIndex: number
  editedItem: Ingredient

  constructor(private shopService: ShoppingListService, private store: Store<fromShoppingList.AppState>) {}

  ngOnInit() {
    this.subscription = this.shopService.startEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index
        this.editMode = true
        this.editedItem = this.shopService.getIngredient(index)
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if (!this.editMode) {
      this.store.dispatch(new ShoppingList.AddIngredient(newIngredient))
      // this.shopService.addIngredient(newIngredient)
    } else {
      this.store.dispatch(new ShoppingList.UpdateIngredient({index: this.editedItemIndex, ingredient: newIngredient}))
      // this.shopService.updateIngredient(this.editedItemIndex, newIngredient)
    }
    this.onClear()
  }

  onDelete() {
    this.store.dispatch(new ShoppingList.DeleteIngredient(this.editedItemIndex))
    // this.shopService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
