import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-historial-productos',
  templateUrl: './historial-productos.page.html',
  styleUrls: ['./historial-productos.page.scss'],
})
export class HistorialProductosPage implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(true,'vendedor')
  }
}
