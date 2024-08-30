import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfilc',
  templateUrl: './perfilc.page.html',
  styleUrls: ['./perfilc.page.scss'],
})
export class PerfilcPage implements OnInit {

  public email: string = "example@duocuc.cl";

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(true,'comprador')
    this.menuCtrl.enable(false,'vendedor')
  }

}
