import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-productoc',
  templateUrl: './productoc.page.html',
  styleUrls: ['./productoc.page.scss'],
})
export class ProductocPage implements OnInit {

  constructor(private menuCtrl: MenuController) {}


  ngOnInit() {
    this.menuCtrl.enable(true,'comprador')
    this.menuCtrl.enable(false,'vendedor')
  }

}
