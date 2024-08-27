import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-catalogoc',
  templateUrl: './catalogoc.page.html',
  styleUrls: ['./catalogoc.page.scss'],
})
export class CatalogocPage implements OnInit {

  constructor(private menuCtrl: MenuController) {}


  ngOnInit() {
    this.menuCtrl.enable(true,'comprador')
    this.menuCtrl.enable(false,'vendedor')
  }

}
