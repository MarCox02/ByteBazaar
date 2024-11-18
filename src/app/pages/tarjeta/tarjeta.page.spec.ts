import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarjetaPage } from './tarjeta.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { of, BehaviorSubject } from 'rxjs';

describe('TarjetaPage', () => {
  let component: TarjetaPage;
  let fixture: ComponentFixture<TarjetaPage>;
  let servicebdSpy: jasmine.SpyObj<ServicebdService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Crear espías para los servicios utilizados en el componente
    servicebdSpy = jasmine.createSpyObj('ServicebdService', ['cargarTarjetas', 'getTarjetasByRUT', 'eliminarTarjeta']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['obtenerUsuario']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Simular el retorno de un usuario en el servicio UserService
    userServiceSpy.obtenerUsuario.and.returnValue(Promise.resolve({
      rut: '12345678-9',
      nombre: 'Juan',
      apellido: 'Perez',
      user: 'juanperez',
      telefono: '123456789',
      correo: 'juan@correo.com',
      contrasena: '1234',
      id_rol: '1',
      foto_perfil: 'url-de-la-imagen.jpg'  // Agrega esta propiedad
    }));

    // Simular un observable con tarjetas usando BehaviorSubject
    const tarjetasSubject = new BehaviorSubject<any[]>([
      { numero_tarjeta: '1234', titular: 'Juan Perez' },
      { numero_tarjeta: '5678', titular: 'Maria Lopez' }
    ]);
    servicebdSpy.tarjetas$ = tarjetasSubject.asObservable();

    TestBed.configureTestingModule({
      declarations: [ TarjetaPage ],
      providers: [
        { provide: ServicebdService, useValue: servicebdSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(TarjetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se cree correctamente
  });
});
