import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { MatIconModule } from '@angular/material/icon';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
      IonicModule.forRoot(),
      AppRoutingModule,
      ReactiveFormsModule,
      MatIconModule,
      MatButtonModule
      
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },NativeStorage, SQLite, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
