import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaptorrrrPage } from './raptorrrr.page';

const routes: Routes = [
  {
    path: '',
    component: RaptorrrrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaptorrrrPageRoutingModule {}
