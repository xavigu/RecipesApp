import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Store } from '@ngrx/store';

import * as ShoppingList from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

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
  ingredients: Ingredient[];
  ingredients$: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.ingredients$ = this.store.select('shoppingList');
  }

  onEditItem(idx: number) {
    this.store.dispatch(new ShoppingList.StartEdit(idx));
  }
}
