import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilvPage } from './perfilv.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilvPageRoutingModule {}
