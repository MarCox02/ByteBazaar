import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-registrarc',
  templateUrl: './registrarc.page.html',
  styleUrls: ['./registrarc.page.scss'],
})
export class RegistrarcPage implements OnInit{

  constructor(private menuCtrl: MenuController) {}

  ngOnInit() {
    this.menuCtrl.enable(false,'vendedor')
    this.menuCtrl.enable(false,'comprador')

  }
}
