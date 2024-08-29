import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfilv',
  templateUrl: './perfilv.page.html',
  styleUrls: ['./perfilv.page.scss'],
})
export class PerfilvPage implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(true,'vendedor')
  }

}
