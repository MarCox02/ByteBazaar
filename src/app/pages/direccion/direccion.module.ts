import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionPageRoutingModule } from './direccion-routing.module';

import { DireccionPage } from './direccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionPageRoutingModule
  ],
  declarations: [DireccionPage]
})
export class DireccionPageModule {}
