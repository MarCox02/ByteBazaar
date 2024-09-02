import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicarvPageRoutingModule } from './publicarv-routing.module';

import { PublicarvPage } from './publicarv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicarvPageRoutingModule
  ],
  declarations: [PublicarvPage]
})
export class PublicarvPageModule {}

