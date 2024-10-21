import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Mazdarx77Page } from './mazdarx77.page';

const routes: Routes = [
  {
    path: '',
    component: Mazdarx77Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Mazdarx77PageRoutingModule {}
