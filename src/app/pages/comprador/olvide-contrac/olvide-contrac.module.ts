import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvideContracPageRoutingModule } from './olvide-contrac-routing.module';

import { OlvideContracPage } from './olvide-contrac.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlvideContracPageRoutingModule
  ],
  declarations: [OlvideContracPage]
})
export class OlvideContracPageModule {}
