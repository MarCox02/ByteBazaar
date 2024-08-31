import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilvPageRoutingModule } from './editar-perfilv-routing.module';

import { EditarPerfilvPage } from './editar-perfilv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPerfilvPageRoutingModule
  ],
  declarations: [EditarPerfilvPage]
})
export class EditarPerfilvPageModule {}
