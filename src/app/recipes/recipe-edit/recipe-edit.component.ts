import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { map } from 'rxjs/operators'
import { Subscription } from 'rxjs'

import * as fromApp from '../../store/app.reducer'
import { Recipe } from '../recipe.model'
import * as RecipesActions from '../store/recipes.actions'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number
  editMode = false
  recipeForm: FormGroup
  private storeSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id
      this.editMode = params.id != null // Si id no es undefined el editMode estaría a true
      console.log(this.editMode)
      this.initForm()
    })
  }

  onSubmit() {
    // Al llamarse igual las variables a los atributos al modelo no hace falta seguir este enfoque y simplemente pasarle el recipeForm.value que tiene la misma estructura que el modelo
    console.log(this.recipeForm)
    if (this.editMode) {
      this.store.dispatch(new RecipesActions.UpdateRecipe({index: this.id, newRecipe: this.recipeForm.value}))
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value))
      // this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.goBack()
  }

  onAddIngredient() {
    ;(this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    )
  }

  onDeleteIngredient(index: number) {
    ;(this.recipeForm.get('ingredients') as FormArray).removeAt(index)
  }

  onDeleteIngredients() {
    ;(this.recipeForm.get('ingredients') as FormArray).clear()
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  private initForm() {
    let recipeName = ''
    let recipeImagePath = ''
    let recipeDescription = ''
    const recipeIngredients = new FormArray([])
    if (this.editMode) {
      this.storeSub = 
      this.store.select('recipes').pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          })
        })
      ).subscribe((recipe: Recipe) => {
          recipeName = recipe.name
          recipeImagePath = recipe.imagePath
          recipeDescription = recipe.description
          if (recipe.ingredients) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              )
            }
          }
      })
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    })
  }

  get controls() {
    // a getter
    return (this.recipeForm.get('ingredients') as FormArray).controls
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe()
    }
  }
}
