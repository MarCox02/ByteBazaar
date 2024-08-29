import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-notificacionv',
  templateUrl: './notificacionv.page.html',
  styleUrls: ['./notificacionv.page.scss'],
})
export class NotificacionvPage implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(true,'vendedor')
  }

}
