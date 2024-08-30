import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-cambio-contra-c',
  templateUrl: './cambio-contra-c.page.html',
  styleUrls: ['./cambio-contra-c.page.scss'],
})
export class CambioContraCPage implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(true,'comprador')
    this.menuCtrl.enable(false,'vendedor')
  }

}
