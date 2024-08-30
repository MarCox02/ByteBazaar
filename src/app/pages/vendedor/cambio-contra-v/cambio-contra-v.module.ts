import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioContraVPageRoutingModule } from './cambio-contra-v-routing.module';

import { CambioContraVPage } from './cambio-contra-v.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioContraVPageRoutingModule
  ],
  declarations: [CambioContraVPage]
})
export class CambioContraVPageModule {}
