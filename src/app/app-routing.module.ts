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
    path: 'productov',
    loadChildren: () => import('./pages/vendedor/productov/productov.module').then( m => m.ProductovPageModule)
  },

  {
    path: 'editar-perfilv',
    loadChildren: () => import('./pages/vendedor/editar-perfilv/editar-perfilv.module').then( m => m.EditarPerfilvPageModule)
  },
  {
    path: 'productoc',
    loadChildren: () => import('./pages/comprador/productoc/productoc.module').then( m => m.ProductocPageModule)
  },
  {
    path: 'editar-perfilc',
    loadChildren: () => import('./pages/comprador/editar-perfilc/editar-perfilc.module').then( m => m.EditarPerfilcPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'olvide-contra',
    loadChildren: () => import('./pages/olvide-contra/olvide-contra.module').then( m => m.OlvideContraPageModule)
  },
  {
    path: 'cambio-contra',
    loadChildren: () => import('./pages/cambio-contra/cambio-contra.module').then( m => m.CambioContraPageModule)
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
