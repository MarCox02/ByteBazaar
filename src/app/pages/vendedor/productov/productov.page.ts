import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-productov',
  templateUrl: './productov.page.html',
  styleUrls: ['./productov.page.scss'],
})
export class ProductovPage implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(true,'vendedor')
  }


}
