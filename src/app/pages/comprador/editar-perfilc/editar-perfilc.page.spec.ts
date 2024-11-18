import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdittarjetaPage } from 'src/app/pages/edittarjeta/edittarjeta.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';  // Para evitar errores de definición circular

describe('EdittarjetaPage', () => {
  let component: EdittarjetaPage;
  let fixture: ComponentFixture<EdittarjetaPage>;
  let mockServicebd: jasmine.SpyObj<ServicebdService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    // Crear mocks de los servicios
    mockServicebd = jasmine.createSpyObj('ServicebdService', ['modificarTarjeta', 'crearTarjeta', 'getTarjetasByRUT']);
    mockUserService = jasmine.createSpyObj('UserService', ['obtenerUsuario']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
    

    // Simular los queryParams del ActivatedRoute
    mockActivatedRoute.queryParams = of({ mode: 'edit', tar: '1234567890' });

    await TestBed.configureTestingModule({
      declarations: [EdittarjetaPage],
      providers: [
        { provide: ServicebdService, useValue: mockServicebd },
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      schemas: [NO_ERRORS_SCHEMA],  // Esto ayuda a evitar errores de definición circular
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittarjetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});