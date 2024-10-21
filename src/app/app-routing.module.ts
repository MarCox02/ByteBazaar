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
    path: 'productov/:id',
    loadChildren: () => import('./pages/vendedor/productov/productov.module').then( m => m.ProductovPageModule)
  },

  {
    path: 'editar-perfilv',
    loadChildren: () => import('./pages/vendedor/editar-perfilv/editar-perfilv.module').then( m => m.EditarPerfilvPageModule)
  },
  {
    path: 'productoc/:id',
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
    path: 'direccion',
    loadChildren: () => import('./pages/direccion/direccion.module').then( m => m.DireccionPageModule)
  },
  {
    path: 'tarjeta',
    loadChildren: () => import('./pages/tarjeta/tarjeta.module').then( m => m.TarjetaPageModule)
  },
  {
    path: 'boleta',
    loadChildren: () => import('./pages/boleta/boleta.module').then( m => m.BoletaPageModule)
  },
  {
    path: 'edittarjeta',
    loadChildren: () => import('./pages/edittarjeta/edittarjeta.module').then( m => m.EdittarjetaPageModule)
  },
  {
    path: 'editdireccion',
    loadChildren: () => import('./pages/editdireccion/editdireccion.module').then( m => m.EditdireccionPageModule)
  },
  {
    path: 'cambio-contra',
    loadChildren: () => import('./pages/cambio-contra/cambio-contra.module').then( m => m.CambioContraPageModule)
  },
  {
    path: 'seleccion',
    loadChildren: () => import('./pages/seleccion/seleccion.module').then( m => m.SeleccionPageModule)
  },
  {

    path: 'detalle-venta',
    loadChildren: () => import('./pages/detalle-venta/detalle-venta.module').then( m => m.DetalleVentaPageModule)

    path: 'introduzca-contra',
    loadChildren: () => import('./pages/introduzca-contra/introduzca-contra.module').then( m => m.IntroduzcaContraPageModule)
  },
  
  {
    path: 'cambio-contra-perfil',
    loadChildren: () => import('./pages/cambio-contra-perfil/cambio-contra-perfil.module').then( m => m.CambioContraPerfilPageModule)

  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
