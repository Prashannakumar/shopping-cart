import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AddproductComponent } from '../Products/addproduct/addproduct.component';
import { MycartComponent } from '../Products/mycart/mycart.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MycartComponent,
    AddproductComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
