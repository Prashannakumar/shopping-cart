import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ListproductsComponent } from './Products/listproducts/listproducts.component';

const routes : Routes = [{path : "", component : ListproductsComponent},
                        {path : "login", component : LoginComponent},
                        {path : "categories", redirectTo : "/", pathMatch : "full"},
                        {path : "categories/:catid", component : ListproductsComponent},
                        {path : "auth", loadChildren : ()=> import("./auth/auth.module").then(m=> m.AuthModule)},
                        {path : "**", component : PagenotfoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
