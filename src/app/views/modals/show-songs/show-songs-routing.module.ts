import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowSongsPage } from './show-songs.page';

const routes: Routes = [
  {
    path: '',
    component: ShowSongsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowSongsPageRoutingModule {}
