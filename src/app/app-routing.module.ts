import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./views/home/home.module').then((m) => m.HomePageModule),
    canActivate: [LoginGuard, IntroGuard],
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
    loadChildren: () => import('./views/regist/regist.module').then( m => m.RegistPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
