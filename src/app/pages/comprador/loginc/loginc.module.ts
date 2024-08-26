import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogincPageRoutingModule } from './loginc-routing.module';

import { LogincPage } from './loginc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogincPageRoutingModule
  ],
  declarations: [LogincPage]
})
export class LogincPageModule {}
