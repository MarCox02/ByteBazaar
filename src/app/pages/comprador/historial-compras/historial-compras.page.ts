import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.page.html',
  styleUrls: ['./historial-compras.page.scss'],
})
export class HistorialComprasPage implements OnInit {
  public compras = [
    {id: '12LNVDSKT320',nombre:'Laptop Lenovo',color:'color:rgb(51, 90, 218);',estado:'En Ruta',img:'/assets/computador lenovo.jpg',},
    {id: 'M432LGTMUSSEGGM',nombre:'Logitech mouse Gamer',color:'color:rgb(211, 0, 0)',estado:'Cancelado',img:'/assets/mouselogitex.jpg'},
    {id: 'G413LGTTKLSEMGK',nombre:'Logitech teclado mecanico',color:'color:rgb(0, 128, 0);',estado:'Entregado',img:'/assets/teclado.jpg'},

  ]
  constructor(private menuCtrl: MenuController)  { }

  ngOnInit() {
    this.menuCtrl.enable(true,'comprador')
    this.menuCtrl.enable(false,'vendedor')
  }
}
