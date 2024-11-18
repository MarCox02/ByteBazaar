import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, MenuController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { PerfilvPage } from './perfilv.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';

describe('PerfilvPage', () => {
  let component: PerfilvPage;
  let fixture: ComponentFixture<PerfilvPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilvPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: NavController,
          useValue: {
            navigateForward: jasmine.createSpy(), // Mock para `NavController` si es necesario
          },
        },
        {
          provide: MenuController,
          useValue: {
            enable: jasmine.createSpy(), // Mock para `MenuController`
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy(), // Mock para navegación
          },
        },
        {
          provide: UserService,
          useValue: {
            currentUser$: of(null), // Mock para el observable del usuario
            obtenerUsuario: jasmine.createSpy().and.resolveTo(null), // Mock para `obtenerUsuario`
            cerrarSesion: jasmine.createSpy().and.resolveTo(), // Mock para `cerrarSesion`
          },
        },
        {
          provide: ServicebdService,
          useValue: {
            eliminarUsuario: jasmine.createSpy().and.resolveTo(), // Mock para `eliminarUsuario`
          },
        },
        {
          provide: AlertController,
          useValue: {
            create: jasmine.createSpy().and.returnValue(Promise.resolve({
              present: jasmine.createSpy().and.returnValue(Promise.resolve()),
            })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});