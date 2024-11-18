import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DireccionPage } from './direccion.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

class MockServicebdService {}
class MockUserService {
  obtenerUsuario() {
    return Promise.resolve({ rut: '123456789' });
  }
}
class MockAlertController {}
class MockRouter {}

describe('DireccionPage', () => {
  let component: DireccionPage;
  let fixture: ComponentFixture<DireccionPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DireccionPage],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: UserService, useClass: MockUserService },
        { provide: AlertController, useClass: MockAlertController },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DireccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
