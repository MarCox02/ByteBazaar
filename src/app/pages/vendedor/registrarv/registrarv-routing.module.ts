import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarvPage } from './registrarv.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarvPageRoutingModule {}
