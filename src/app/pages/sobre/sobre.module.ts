import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

import { IonicModule } from '@ionic/angular';

import { SobrePageRoutingModule } from './sobre-routing.module';

import { SobrePage } from './sobre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SobrePageRoutingModule,
    MatIconModule
  ],
  declarations: [SobrePage]
})
export class SobrePageModule {}
