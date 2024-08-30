import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialComprasPageRoutingModule } from './historial-compras-routing.module';

import { HistorialComprasPage } from './historial-compras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialComprasPageRoutingModule
  ],
  declarations: [HistorialComprasPage]
})
export class HistorialComprasPageModule {}
