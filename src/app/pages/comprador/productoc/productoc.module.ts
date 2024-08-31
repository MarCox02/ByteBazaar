import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductocPageRoutingModule } from './productoc-routing.module';

import { ProductocPage } from './productoc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductocPageRoutingModule
  ],
  declarations: [ProductocPage]
})
export class ProductocPageModule {}
