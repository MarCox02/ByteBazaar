import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialProductosPage } from './historial-productos.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialProductosPageRoutingModule {}
