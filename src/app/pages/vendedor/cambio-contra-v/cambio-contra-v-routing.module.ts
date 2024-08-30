import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioContraVPage } from './cambio-contra-v.page';

const routes: Routes = [
  {
    path: '',
    component: CambioContraVPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioContraVPageRoutingModule {}
