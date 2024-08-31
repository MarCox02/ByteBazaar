import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductovPage } from './productov.page';

const routes: Routes = [
  {
    path: '',
    component: ProductovPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductovPageRoutingModule {}
