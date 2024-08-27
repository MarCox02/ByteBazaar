import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'loginv',
    loadChildren: () => import('./pages/vendedor/loginv/loginv.module').then( m => m.LoginvPageModule)
  },
  {
    path: 'loginc',
    loadChildren: () => import('./pages/comprador/loginc/loginc.module').then( m => m.LogincPageModule)
  },
  {
    path: 'registrarc',
    loadChildren: () => import('./pages/comprador/registrarc/registrarc.module').then( m => m.RegistrarcPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
