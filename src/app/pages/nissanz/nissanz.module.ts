import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NissanzPageRoutingModule } from './nissanz-routing.module';

import { NissanzPage } from './nissanz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NissanzPageRoutingModule
  ],
  declarations: [NissanzPage]
})
export class NissanzPageModule {}
