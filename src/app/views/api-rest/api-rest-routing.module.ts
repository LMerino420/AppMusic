import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APIRestPage } from './api-rest.page';

const routes: Routes = [
  {
    path: '',
    component: APIRestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class APIRestPageRoutingModule {}
