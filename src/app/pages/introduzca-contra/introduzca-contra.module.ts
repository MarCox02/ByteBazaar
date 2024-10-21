import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroduzcaContraPageRoutingModule } from './introduzca-contra-routing.module';

import { IntroduzcaContraPage } from './introduzca-contra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroduzcaContraPageRoutingModule
  ],
  declarations: [IntroduzcaContraPage]
})
export class IntroduzcaContraPageModule {}
