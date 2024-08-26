import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginvPage } from './loginv.page';

const routes: Routes = [
  {
    path: '',
    component: LoginvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginvPageRoutingModule {}
