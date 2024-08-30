import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioContraCPage } from './cambio-contra-c.page';

const routes: Routes = [
  {
    path: '',
    component: CambioContraCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioContraCPageRoutingModule {}
