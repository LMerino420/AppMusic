import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APIRestPage } from './api-rest.page';

const routes: Routes = [
  {
    path: '',
    component: APIRestPage,
    children: [
      {
        path: 'ranDogs',
        loadChildren: () =>
          import('../random-dogs/random-dogs.module').then(
            (m) => m.RandomDogsPageModule
          ),
      },
      {
        path: 'favDogs',
        loadChildren: () =>
          import('../favoritos/favoritos.module').then(
            (m) => m.FavoritosPageModule
          ),
      },
      {
        path: 'uploadPic',
        loadChildren: () =>
          import('../upload/upload.module').then((m) => m.UploadPageModule),
      },
      {
        path: '',
        redirectTo: 'ranDogs',
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
