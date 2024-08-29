import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionvPage } from './notificacionv.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionvPageRoutingModule {}
