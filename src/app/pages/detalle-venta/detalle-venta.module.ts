import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleVentaPageRoutingModule } from './detalle-venta-routing.module';

import { DetalleVentaPage } from './detalle-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleVentaPageRoutingModule
  ],
  declarations: [DetalleVentaPage]
})
export class DetalleVentaPageModule {}
