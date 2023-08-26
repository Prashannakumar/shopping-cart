import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { AddproductComponent } from '../Products/addproduct/addproduct.component';
import { MycartComponent } from '../Products/mycart/mycart.component';

const routes: Routes = [
  {path : "", children: [
  {path : "mycart", component : MycartComponent, canActivate : [AuthGuard]},
  {path : "addproducts", component : AddproductComponent, canActivate : [AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
