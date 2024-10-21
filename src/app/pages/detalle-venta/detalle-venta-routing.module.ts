import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleVentaPage } from './detalle-venta.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleVentaPageRoutingModule {}
