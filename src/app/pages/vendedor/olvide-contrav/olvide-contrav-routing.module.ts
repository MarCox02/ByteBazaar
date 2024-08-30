import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlvideContravPage } from './olvide-contrav.page';

const routes: Routes = [
  {
    path: '',
    component: OlvideContravPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OlvideContravPageRoutingModule {}
