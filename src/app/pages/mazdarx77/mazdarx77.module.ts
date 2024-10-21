import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Mazdarx77PageRoutingModule } from './mazdarx77-routing.module';

import { Mazdarx77Page } from './mazdarx77.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Mazdarx77PageRoutingModule
  ],
  declarations: [Mazdarx77Page]
})
export class Mazdarx77PageModule {}
