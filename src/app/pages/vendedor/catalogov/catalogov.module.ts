import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogovPageRoutingModule } from './catalogov-routing.module';

import { CatalogovPage } from './catalogov.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogovPageRoutingModule
  ],
  declarations: [CatalogovPage]
})
export class CatalogovPageModule {}
