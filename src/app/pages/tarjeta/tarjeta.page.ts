import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.page.html',
  styleUrls: ['./tarjeta.page.scss'],
})
export class TarjetaPage implements OnInit {

  tarjetas: any = [
    {
      id: '',
      titulo: '',
      texto: ''
    }
  ]

  constructor(private servicesbd: ServicebdService, private router: Router) { }

  ngOnInit() {
    
  }

}
