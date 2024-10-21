import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';

import { SubastaPageRoutingModule } from './subasta-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SubastaPage } from './subasta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubastaPageRoutingModule,
    MatIconModule
  ],
  declarations: [SubastaPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class SubastaPageModule {}

