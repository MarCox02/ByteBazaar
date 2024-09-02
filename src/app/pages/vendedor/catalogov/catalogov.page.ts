import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalogov',
  templateUrl: './catalogov.page.html',
  styleUrls: ['./catalogov.page.scss'],
})
export class CatalogovPage implements OnInit {

  Usuario: string = "";

  constructor(private menuCtrl: MenuController,private router: Router, private activerouter: ActivatedRoute) {
    this.activerouter.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.Usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];
      }
    })
  }

  ngOnInit() {
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(true,'vendedor')
  }

}
