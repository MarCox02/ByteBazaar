import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogovPage } from './catalogov.page';

const routes: Routes = [
  {
    path: '',
    component: CatalogovPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogovPageRoutingModule {}
