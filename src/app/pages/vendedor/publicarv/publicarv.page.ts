import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-publicarv',
  templateUrl: './publicarv.page.html',
  styleUrls: ['./publicarv.page.scss'],
})
export class PublicarvPage implements OnInit {
  imageSrc: string | ArrayBuffer | null = null;

  constructor(private menuCtrl: MenuController) {}


  ngOnInit() {
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(true,'vendedor')
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
}
