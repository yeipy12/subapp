import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubarustiiiPage } from './subarustiii.page';

const routes: Routes = [
  {
    path: '',
    component: SubarustiiiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubarustiiiPageRoutingModule {}
