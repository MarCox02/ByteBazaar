import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EdittarjetaPageRoutingModule } from './edittarjeta-routing.module';

import { EdittarjetaPage } from './edittarjeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdittarjetaPageRoutingModule
  ],
  declarations: [EdittarjetaPage]
})
export class EdittarjetaPageModule {}
