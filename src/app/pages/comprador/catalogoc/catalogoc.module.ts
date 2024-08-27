import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogocPageRoutingModule } from './catalogoc-routing.module';

import { CatalogocPage } from './catalogoc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogocPageRoutingModule
  ],
  declarations: [CatalogocPage]
})
export class CatalogocPageModule {}
