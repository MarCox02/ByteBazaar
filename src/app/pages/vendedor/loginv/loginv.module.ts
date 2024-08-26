import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginvPageRoutingModule } from './loginv-routing.module';

import { LoginvPage } from './loginv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginvPageRoutingModule
  ],
  declarations: [LoginvPage]
})
export class LoginvPageModule {}
