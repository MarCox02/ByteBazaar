import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilcPage } from './perfilc.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilcPageRoutingModule {}
