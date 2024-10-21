import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroduzcaContraPage } from './introduzca-contra.page';

const routes: Routes = [
  {
    path: '',
    component: IntroduzcaContraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroduzcaContraPageRoutingModule {}
