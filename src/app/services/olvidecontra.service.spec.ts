import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importar el HttpClientTestingModule
import { OlvideContraService } from './olvidecontra.service';
import { AlertController } from '@ionic/angular';

// Mock de AlertController para que no interfiera con las pruebas
class MockAlertController {
  create = jasmine.createSpy('create').and.returnValue(Promise.resolve({
    present: jasmine.createSpy('present')
  }));
}

describe('OlvideContraService', () => {
  let service: OlvideContraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Asegurarse de que se importe el módulo de pruebas del HttpClient
      providers: [
        OlvideContraService,
        { provide: AlertController, useClass: MockAlertController }  // Usar el mock del AlertController
      ]
    });

    service = TestBed.inject(OlvideContraService);
  });

  it('should be created', () => {
    // Verificar que el servicio se haya creado correctamente
    expect(service).toBeTruthy();
  });
});
