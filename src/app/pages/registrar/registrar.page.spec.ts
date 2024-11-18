import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarPage } from './registrar.page';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

describe('RegistrarPage', () => {
  let component: RegistrarPage;
  let fixture: ComponentFixture<RegistrarPage>;

  // Mock services
  const mockServicebd = {
    fetchUsuarios: jasmine.createSpy().and.returnValue(of([])),
    registrarUsuario: jasmine.createSpy().and.returnValue(Promise.resolve())
  };

  const mockUserService = {};
  const mockMenuController = { enable: jasmine.createSpy() };
  const mockAlertController = { create: jasmine.createSpy().and.returnValue(Promise.resolve({ present: jasmine.createSpy() })) };
  const mockToastController = { create: jasmine.createSpy().and.returnValue(Promise.resolve({ present: jasmine.createSpy() })) };
  const mockRouter = { navigate: jasmine.createSpy() };
  const mockSQLite = {};
  const mockNativeStorage = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarPage],
      providers: [
        { provide: MenuController, useValue: mockMenuController },
        { provide: AlertController, useValue: mockAlertController },
        { provide: ToastController, useValue: mockToastController },
        { provide: Router, useValue: mockRouter },
        { provide: SQLite, useValue: mockSQLite },
        { provide: ServicebdService, useValue: mockServicebd },
        { provide: NativeStorage, useValue: mockNativeStorage },
        { provide: UserService, useValue: mockUserService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
