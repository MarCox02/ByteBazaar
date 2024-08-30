import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.page.html',
  styleUrls: ['./historial-compras.page.scss'],
})
export class HistorialComprasPage implements OnInit {

  constructor(private menuCtrl: MenuController)  { }

  ngOnInit() {
    this.menuCtrl.enable(true,'comprador')
    this.menuCtrl.enable(false,'vendedor')
  }
}
