import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecupecontraPageRoutingModule } from './recupecontra-routing.module';

import { RecupecontraPage } from './recupecontra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecupecontraPageRoutingModule
  ],
  declarations: [RecupecontraPage]
})
export class RecupecontraPageModule {}
