import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilcPageRoutingModule } from './editar-perfilc-routing.module';

import { EditarPerfilcPage } from './editar-perfilc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPerfilcPageRoutingModule
  ],
  declarations: [EditarPerfilcPage]
})
export class EditarPerfilcPageModule {}
