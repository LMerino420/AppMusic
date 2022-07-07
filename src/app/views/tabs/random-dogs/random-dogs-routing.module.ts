import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RandomDogsPage } from './random-dogs.page';

const routes: Routes = [
  {
    path: '',
    component: RandomDogsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RandomDogsPageRoutingModule {}
