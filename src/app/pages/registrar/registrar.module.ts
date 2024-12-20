import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { IonicModule } from '@ionic/angular';

import { RegistrarPageRoutingModule } from './registrar-routing.module';

import { RegistrarPage } from './registrar.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RegistrarPageRoutingModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrarPage]
})
export class RegistrarPageModule {}
