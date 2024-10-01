import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioContraPageRoutingModule } from './cambio-contra-routing.module';

import { CambioContraPage } from './cambio-contra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioContraPageRoutingModule
  ],
  declarations: [CambioContraPage]
})
export class CambioContraPageModule {}
