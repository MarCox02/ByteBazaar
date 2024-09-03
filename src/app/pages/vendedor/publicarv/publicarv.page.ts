import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-publicarv',
  templateUrl: './publicarv.page.html',
  styleUrls: ['./publicarv.page.scss'],
})
export class PublicarvPage implements OnInit {
  imageSrc: string | ArrayBuffer | null = null;
  nombreProducto: string = '';
  descripcionProducto: string = '';
  cantidad: number | null = null;
  precio: number | null = null;

  constructor(private menuCtrl: MenuController, private alertController: AlertController, private router: Router) {}

  ngOnInit() {
    this.menuCtrl.enable(false, 'comprador');
    this.menuCtrl.enable(true, 'vendedor');
  }

  formulario() {
    if (this.nombreProducto.trim() === '') {
      this.alerta('Error', ' Un Valor ingresado es invalido');
      return;
    }

    if (this.descripcionProducto.trim() === '') {
      // Agregar mensaje de error para descripción
      this.alerta('Error', ' Un Valor ingresado es invalido');
      return;
    }

    if (this.cantidad === null || this.cantidad < 0) {
      // Agregar mensaje de error para cantidad
      this.alerta('Error', ' Un Valor ingresado es invalido');
      return;
    }

    if (this.precio === null || this.precio < 0) {
      // Agregar mensaje de error para precio
      this.alerta('Error', ' Un Valor ingresado es invalido');
      return;
    }

    // Lógica para enviar datos o realizar acción de publicación

    this.router.navigate(['/catalogov']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }
  async alerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }


}


