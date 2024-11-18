import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OlvideContraPage } from './olvide-contra.page';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { OlvideContraService } from 'src/app/services/olvidecontra.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

// Mock de los servicios que se utilizan en el componente
class MockAlertController {
  create = jasmine.createSpy('create').and.returnValue(Promise.resolve({
    present: jasmine.createSpy('present')
  }));
}

class MockToastController {
  create = jasmine.createSpy('create').and.returnValue(Promise.resolve({
    present: jasmine.createSpy('present')
  }));
}

class MockServicebdService {
  verificarCorreo = jasmine.createSpy('verificarCorreo').and.returnValue(of(true)); // Simula que el correo está registrado
}

class MockOlvideContraService {
  enviarCorreo = jasmine.createSpy('enviarCorreo').and.returnValue(of('Correo enviado')); // Simula que el correo se envió correctamente
}

describe('OlvideContraPage', () => {
  let component: OlvideContraPage;
  let fixture: ComponentFixture<OlvideContraPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OlvideContraPage],
      providers: [
        { provide: AlertController, useClass: MockAlertController },
        { provide: ToastController, useClass: MockToastController },
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: OlvideContraService, useClass: MockOlvideContraService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } } // Mock de Router para evitar navegación real
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OlvideContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se cree correctamente
  });
});
