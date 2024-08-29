import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilvPageRoutingModule } from './perfilv-routing.module';

import { PerfilvPage } from './perfilv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilvPageRoutingModule
  ],
  declarations: [PerfilvPage]
})
export class PerfilvPageModule {}
