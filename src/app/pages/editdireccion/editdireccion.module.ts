import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditdireccionPageRoutingModule } from './editdireccion-routing.module';

import { EditdireccionPage } from './editdireccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditdireccionPageRoutingModule
  ],
  declarations: [EditdireccionPage]
})
export class EditdireccionPageModule {}
