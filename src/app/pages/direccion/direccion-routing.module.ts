import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionPage } from './direccion.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionPageRoutingModule {}
