import { Component,OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-loginc',
  templateUrl: './loginc.page.html',
  styleUrls: ['./loginc.page.scss'],
})
export class LogincPage implements OnInit{

  constructor(private menuCtrl: MenuController) {}

  ngOnInit() {
    this.menuCtrl.enable(false,'vendedor')
    this.menuCtrl.enable(false,'comprador')

  }
}
