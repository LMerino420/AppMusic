import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu/home',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadChildren: () =>
      import('./views/intro/intro.module').then((m) => m.IntroPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./views/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'regist',
    loadChildren: () =>
      import('./views/regist/regist.module').then((m) => m.RegistPageModule),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./views/menu/menu.module').then((m) => m.MenuPageModule),
    canActivate: [LoginGuard, IntroGuard],
  },
  {
    path: 'songs-modal',
    loadChildren: () => import('./views/songs-modal/songs-modal.module').then( m => m.SongsModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
