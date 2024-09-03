import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-productoc',
  templateUrl: './productoc.page.html',
  styleUrls: ['./productoc.page.scss'],
})
export class ProductocPage implements OnInit {

  constructor(private menuCtrl: MenuController,private alertController: AlertController,  private router: Router,  private toastController: ToastController) {}


  ngOnInit() {
    this.menuCtrl.enable(true,'comprador')
    this.menuCtrl.enable(false,'vendedor')
  }

  aniadirProducto(){
  this.router.navigate(['/catalogoc'])
  this.presentToast('Éxito', 'El producto fue exitosamente añadido a tu carrito');
  }


  async presentToast(titulo: string, mensaje: string ) {
    const alert_t = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
    });

    await alert_t.present();
  }
}
