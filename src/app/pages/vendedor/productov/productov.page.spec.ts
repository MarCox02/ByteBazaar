import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductovPage } from './productov.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { of } from 'rxjs'; // Importar 'of' para crear observables de prueba

describe('ProductovPage', () => {
  let component: ProductovPage;
  let fixture: ComponentFixture<ProductovPage>;
  let servicebdService: ServicebdService;
  let userService: UserService;
  let activatedRoute: ActivatedRoute;
  let alertController: AlertController;
  let menuController: MenuController;
  let router: Router;

  beforeEach(() => {
    // Mock de las dependencias
    const mockServicebdService = {
      obtenerTiposProducto: jasmine.createSpy().and.returnValue(Promise.resolve([])),
      obtenerProductoPorId: jasmine.createSpy().and.returnValue(Promise.resolve(null)),
      actualizarProducto: jasmine.createSpy().and.returnValue(Promise.resolve()),
      eliminarProducto: jasmine.createSpy().and.returnValue(Promise.resolve())
    };

    const mockUserService = {}; // Aquí puedes agregar más mocks si es necesario

    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue('1') // Suponiendo que el ID del producto es 1
        }
      }
    };

    const mockAlertController = {
      create: jasmine.createSpy().and.returnValue(Promise.resolve({ present: jasmine.createSpy() }))
    };

    const mockMenuController = {
      enable: jasmine.createSpy()
    };

    const mockRouter = {
      navigate: jasmine.createSpy()
    };

    TestBed.configureTestingModule({
      declarations: [ProductovPage],
      providers: [
        { provide: ServicebdService, useValue: mockServicebdService },
        { provide: UserService, useValue: mockUserService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: AlertController, useValue: mockAlertController },
        { provide: MenuController, useValue: mockMenuController },
        { provide: Router, useValue: mockRouter }
      ]
    });

    fixture = TestBed.createComponent(ProductovPage);
    component = fixture.componentInstance;
    servicebdService = TestBed.inject(ServicebdService);
    userService = TestBed.inject(UserService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    alertController = TestBed.inject(AlertController);
    menuController = TestBed.inject(MenuController);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más pruebas según sea necesario
});
