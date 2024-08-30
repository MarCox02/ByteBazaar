import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvideContravPageRoutingModule } from './olvide-contrav-routing.module';

import { OlvideContravPage } from './olvide-contrav.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlvideContravPageRoutingModule
  ],
  declarations: [OlvideContravPage]
})
export class OlvideContravPageModule {}
