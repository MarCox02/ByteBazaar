import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-registrarv',
  templateUrl: './registrarv.page.html',
  styleUrls: ['./registrarv.page.scss'],
})
export class RegistrarvPage implements OnInit {

  constructor(private menuCtrl: MenuController) {}

  ngOnInit() {
    this.menuCtrl.enable(false,'vendedor')
    this.menuCtrl.enable(false,'comprador')

  }

}
