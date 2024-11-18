import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialProductosPage } from './historial-productos.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { MenuController } from '@ionic/angular';
import { of } from 'rxjs';

describe('HistorialProductosPage', () => {
  let component: HistorialProductosPage;
  let fixture: ComponentFixture<HistorialProductosPage>;
  let servicebdSpy: jasmine.SpyObj<ServicebdService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let menuCtrlSpy: jasmine.SpyObj<MenuController>;

  beforeEach(() => {
    // Crear espías para los servicios utilizados en el componente
    servicebdSpy = jasmine.createSpyObj('ServicebdService', ['obtenerHistorialVentasPaginado']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['obtenerUsuario']);
    menuCtrlSpy = jasmine.createSpyObj('MenuController', ['enable']);

    TestBed.configureTestingModule({
      declarations: [ HistorialProductosPage ],
      providers: [
        { provide: ServicebdService, useValue: servicebdSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: MenuController, useValue: menuCtrlSpy }
      ]
    });

    fixture = TestBed.createComponent(HistorialProductosPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se crea correctamente
  });
});
