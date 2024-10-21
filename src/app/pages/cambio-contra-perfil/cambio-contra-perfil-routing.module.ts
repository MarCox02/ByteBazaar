import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioContraPerfilPage } from './cambio-contra-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: CambioContraPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioContraPerfilPageRoutingModule {}
