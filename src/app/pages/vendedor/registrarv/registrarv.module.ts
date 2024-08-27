import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarvPageRoutingModule } from './registrarv-routing.module';

import { RegistrarvPage } from './registrarv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarvPageRoutingModule
  ],
  declarations: [RegistrarvPage]
})
export class RegistrarvPageModule {}
