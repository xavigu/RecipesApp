import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared/shared.module'
import { AuthRoutingModule } from './auth.routing.module'

import { AuthComponent } from './auth.component'

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule, // Same as BrowserModule in app.module to use *ngif, *ngfor...
    FormsModule,
    AuthRoutingModule,
    SharedModule,
  ],
})
export class AuthModule {}
