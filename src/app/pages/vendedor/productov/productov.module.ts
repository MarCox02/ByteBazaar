import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductovPageRoutingModule } from './productov-routing.module';

import { ProductovPage } from './productov.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductovPageRoutingModule
  ],
  declarations: [ProductovPage]
})
export class ProductovPageModule {}
