import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NissanzPage } from './nissanz.page';

const routes: Routes = [
  {
    path: '',
    component: NissanzPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NissanzPageRoutingModule {}
