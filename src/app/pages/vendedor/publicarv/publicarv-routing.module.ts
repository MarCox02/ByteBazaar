import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicarvPage } from './publicarv.page';

const routes: Routes = [
  {
    path: '',
    component: PublicarvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicarvPageRoutingModule {}
