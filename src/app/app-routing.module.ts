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
    path: 'registrarv',
    loadChildren: () => import('./pages/vendedor/registrarv/registrarv.module').then( m => m.RegistrarvPageModule)
  },
  {
    path: 'catalogoc',
    loadChildren: () => import('./pages/comprador/catalogoc/catalogoc.module').then( m => m.CatalogocPageModule)
  },
  {
    path: 'catalogov',
    loadChildren: () => import('./pages/vendedor/catalogov/catalogov.module').then( m => m.CatalogovPageModule)
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
