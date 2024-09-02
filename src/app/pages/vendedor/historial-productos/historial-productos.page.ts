import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-historial-productos',
  templateUrl: './historial-productos.page.html',
  styleUrls: ['./historial-productos.page.scss'],
})
export class HistorialProductosPage implements OnInit {
  public productos = [
    {id: '12LNVDSKT320',nombre:'Laptop Lenovo',color:'color:rgb(51, 90, 218);',estado:'En Ruta',img:'/assets/computador lenovo.jpg',},
    {id: 'M432LGTMUSSEGGM',nombre:'Logitech mouse Gamer',color:'color:rgb(211, 0, 0)',estado:'Compra Cancelada',img:'/assets/mouselogitex.jpg'},
    {id: 'G413LGTTKLSEMGK',nombre:'Logitech teclado mecanico',color:'color:rgb(0, 128, 0);',estado:'Entregado',img:'/assets/teclado.jpg'},

  ]

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(true,'vendedor')
  }
}
