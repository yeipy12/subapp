import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaptorrrrPageRoutingModule } from './raptorrrr-routing.module';

import { RaptorrrrPage } from './raptorrrr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaptorrrrPageRoutingModule
  ],
  declarations: [RaptorrrrPage]
})
export class RaptorrrrPageModule {}
