import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditdireccionPage } from './editdireccion.page';

const routes: Routes = [
  {
    path: '',
    component: EditdireccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditdireccionPageRoutingModule {}
