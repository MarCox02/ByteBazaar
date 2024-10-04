import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletaPage } from './boleta.page';

const routes: Routes = [
  {
    path: '',
    component: BoletaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletaPageRoutingModule {}
