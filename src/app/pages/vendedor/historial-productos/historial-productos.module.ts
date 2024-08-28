import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialProductosPageRoutingModule } from './historial-productos-routing.module';

import { HistorialProductosPage } from './historial-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialProductosPageRoutingModule
  ],
  declarations: [HistorialProductosPage]
})
export class HistorialProductosPageModule {}
