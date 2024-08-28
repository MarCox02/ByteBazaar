import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-catalogov',
  templateUrl: './catalogov.page.html',
  styleUrls: ['./catalogov.page.scss'],
})
export class CatalogovPage implements OnInit {

  constructor(private menuCtrl: MenuController) {}


  ngOnInit() {
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(true,'vendedor')
  }
}


