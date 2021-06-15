import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder.directive';
import { FlagPipe } from './pipes/flag.pipe';

@NgModule({
  declarations: [AlertComponent, LoadingSpinnerComponent, DropdownDirective, PlaceholderDirective, FlagPipe],
  imports: [CommonModule],
  exports: [AlertComponent, LoadingSpinnerComponent, DropdownDirective, PlaceholderDirective, FlagPipe, CommonModule],
  entryComponents: [AlertComponent],
})
export class SharedModule {}
