import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPerfilcPage } from './editar-perfilc.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPerfilcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPerfilcPageRoutingModule {}
