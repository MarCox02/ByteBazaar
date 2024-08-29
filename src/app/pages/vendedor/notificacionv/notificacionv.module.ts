import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionvPageRoutingModule } from './notificacionv-routing.module';

import { NotificacionvPage } from './notificacionv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionvPageRoutingModule
  ],
  declarations: [NotificacionvPage]
})
export class NotificacionvPageModule {}
