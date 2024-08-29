import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialComprasPage } from './historial-compras.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialComprasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialComprasPageRoutingModule {}
