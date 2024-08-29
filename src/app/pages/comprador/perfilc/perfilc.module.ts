import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilcPageRoutingModule } from './perfilc-routing.module';

import { PerfilcPage } from './perfilc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilcPageRoutingModule
  ],
  declarations: [PerfilcPage]
})
export class PerfilcPageModule {}
