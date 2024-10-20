import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionPageRoutingModule } from './seleccion-routing.module';

import { SeleccionPage } from './seleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionPageRoutingModule
  ],
  declarations: [SeleccionPage]
})
export class SeleccionPageModule {}
