import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditdireccionPage } from './editdireccion.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs'; // Necesario para simular los queryParams
import { NO_ERRORS_SCHEMA } from '@angular/core';  // Añadido para evitar errores con componentes no definidos

describe('EditdireccionPage', () => {
  let component: EditdireccionPage;
  let fixture: ComponentFixture<EditdireccionPage>;
  let mockServicebd: jasmine.SpyObj<ServicebdService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    // Crear mocks de los servicios
    mockServicebd = jasmine.createSpyObj('ServicebdService', ['modificarDireccion', 'crearDireccion', 'getDireccionesByRUT']);
    mockUserService = jasmine.createSpyObj('UserService', ['obtenerUsuario']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
    
    // Simular que el método obtenerUsuario devuelve una Promise con un objeto usuario
    // Simular los queryParams del ActivatedRoute
    mockActivatedRoute.queryParams = of({ mode: 'edit', dir: '1' });

    await TestBed.configureTestingModule({
      declarations: [EditdireccionPage],
      providers: [
        { provide: ServicebdService, useValue: mockServicebd },
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      schemas: [NO_ERRORS_SCHEMA],  // Esto ayuda a evitar errores de definición circular al no tratar de cargar componentes no definidos
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdireccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});