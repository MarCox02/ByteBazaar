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
    path: 'historial-productos',
    loadChildren: () => import('./pages/vendedor/historial-productos/historial-productos.module').then( m => m.HistorialProductosPageModule)
  },

  {path: 'publicarv',
    loadChildren: () => import('./pages/vendedor/publicarv/publicarv.module').then( m => m.PublicarvPageModule)},

  {
    path: 'perfilv',
    loadChildren: () => import('./pages/vendedor/perfilv/perfilv.module').then( m => m.PerfilvPageModule)
  },
  {
    path: 'notificacionv',
    loadChildren: () => import('./pages/vendedor/notificacionv/notificacionv.module').then( m => m.NotificacionvPageModule)
  },
  {
    path: 'perfilc',
    loadChildren: () => import('./pages/comprador/perfilc/perfilc.module').then( m => m.PerfilcPageModule)
  },
  {
    path: 'historial-compras',
    loadChildren: () => import('./pages/comprador/historial-compras/historial-compras.module').then( m => m.HistorialComprasPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/comprador/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'cambio-contra-c',
    loadChildren: () => import('./pages/comprador/cambio-contra-c/cambio-contra-c.module').then( m => m.CambioContraCPageModule)
  },
  {
    path: 'cambio-contra-v',
    loadChildren: () => import('./pages/vendedor/cambio-contra-v/cambio-contra-v.module').then( m => m.CambioContraVPageModule)
  },

  {
    path: 'olvide-contrac',
    loadChildren: () => import('./pages/comprador/olvide-contrac/olvide-contrac.module').then( m => m.OlvideContracPageModule)
  },
  {
    path: 'olvide-contrav',
    loadChildren: () => import('./pages/vendedor/olvide-contrav/olvide-contrav.module').then( m => m.OlvideContravPageModule)
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
