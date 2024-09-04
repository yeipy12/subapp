import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';

import { SubastaPageRoutingModule } from './subasta-routing.module';

import { SubastaPage } from './subasta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubastaPageRoutingModule,
    MatIconModule
  ],
  declarations: [SubastaPage]
})
export class SubastaPageModule {}
