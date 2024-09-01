import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalogoc',
  templateUrl: './catalogoc.page.html',
  styleUrls: ['./catalogoc.page.scss'],
})
export class CatalogocPage implements OnInit {

  Usuario: string = "";

  constructor(private menuCtrl: MenuController,private router: Router, private activerouter: ActivatedRoute) {
    this.activerouter.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.Usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];
      }
    })
  }

  ngOnInit() {
    this.menuCtrl.enable(true,'comprador')
    this.menuCtrl.enable(false,'vendedor')
  }

}
