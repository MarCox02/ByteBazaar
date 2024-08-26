import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogincPage } from './loginc.page';

const routes: Routes = [
  {
    path: '',
    component: LogincPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogincPageRoutingModule {}
