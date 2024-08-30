import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioContraCPageRoutingModule } from './cambio-contra-c-routing.module';

import { CambioContraCPage } from './cambio-contra-c.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioContraCPageRoutingModule
  ],
  declarations: [CambioContraCPage]
})
export class CambioContraCPageModule {}
