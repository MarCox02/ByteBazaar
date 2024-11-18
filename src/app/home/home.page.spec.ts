import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomePage } from './home.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from '../services/user.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  // Mock dependencies
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockActivatedRoute = {
    snapshot: {
      params: {},
    },
  };
  const mockServicebdService = jasmine.createSpyObj('ServicebdService', [
    'crearBD',
    'fetchUsuarios',
    'consultarUsuario',
  ]);
  const mockUserService = jasmine.createSpyObj('UserService', ['login']);
  const mockNativeStorage = jasmine.createSpyObj('NativeStorage', ['getItem', 'setItem']);
  const mockNavController = jasmine.createSpyObj('NavController', ['navigateForward', 'navigateBack', 'navigateRoot']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ServicebdService, useValue: mockServicebdService },
        { provide: UserService, useValue: mockUserService },
        { provide: NativeStorage, useValue: mockNativeStorage },
        { provide: NavController, useValue: mockNavController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    // Mock implementation for fetchUsuarios
    mockServicebdService.fetchUsuarios.and.returnValue(of([]));
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});