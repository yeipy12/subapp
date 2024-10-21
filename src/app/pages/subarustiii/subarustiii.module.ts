import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubarustiiiPageRoutingModule } from './subarustiii-routing.module';

import { SubarustiiiPage } from './subarustiii.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubarustiiiPageRoutingModule
  ],
  declarations: [SubarustiiiPage]
})
export class SubarustiiiPageModule {}
