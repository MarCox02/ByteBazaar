import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioContraPerfilPageRoutingModule } from './cambio-contra-perfil-routing.module';

import { CambioContraPerfilPage } from './cambio-contra-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioContraPerfilPageRoutingModule
  ],
  declarations: [CambioContraPerfilPage]
})
export class CambioContraPerfilPageModule {}
