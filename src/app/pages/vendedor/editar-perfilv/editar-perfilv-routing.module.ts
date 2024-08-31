import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPerfilvPage } from './editar-perfilv.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPerfilvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPerfilvPageRoutingModule {}
