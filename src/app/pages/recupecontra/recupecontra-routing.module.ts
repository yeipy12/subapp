import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecupecontraPage } from './recupecontra.page';

const routes: Routes = [
  {
    path: '',
    component: RecupecontraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecupecontraPageRoutingModule {}
