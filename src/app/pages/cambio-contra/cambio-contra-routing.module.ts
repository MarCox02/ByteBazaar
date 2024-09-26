import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioContraPage } from './cambio-contra.page';

const routes: Routes = [
  {
    path: '',
    component: CambioContraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioContraPageRoutingModule {}
