import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APIRestPage } from './api-rest.page';

const routes: Routes = [
  {
    path: '',
    component: APIRestPage,
    children: [
      {
        path: 'favoritos',
        loadChildren: () =>
          import('../favoritos/favoritos.module').then(
            (m) => m.FavoritosPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'api-rest',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class APIRestPageRoutingModule {}
