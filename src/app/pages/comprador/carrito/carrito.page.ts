import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  public carrito = [
    {id:'#2564',nombre: 'laptop Gamer Lenovo',url:'/productoc',precio:250000,tag:'Laptop',marca:'Lenovo',img:'/assets/computador lenovo.jpg'},
    {id:'#3214',nombre: 'Mouse Gamer logitec',url:'/catalogoc',precio:25000,tag:'Mouse',marca:'logitec',img:'/assets/mouselogitex.jpg'},
  ]
  public total: any;
  public envio: any;

  getTotalPrice(): number {
    let total = 0;

    // Using a for loop to iterate through the items
    for (let i = 0; i < this.carrito.length; i++) {
      total += this.carrito[i].precio;
    }
    return total;
  }

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(true,'comprador')
    this.menuCtrl.enable(false,'vendedor')
  }

}
