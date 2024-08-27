import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogocPage } from './catalogoc.page';

const routes: Routes = [
  {
    path: '',
    component: CatalogocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogocPageRoutingModule {}
