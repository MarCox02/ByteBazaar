import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-loginv',
  templateUrl: './loginv.page.html',
  styleUrls: ['./loginv.page.scss'],
})
export class LoginvPage implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(false,'vendedor')
  }
}
