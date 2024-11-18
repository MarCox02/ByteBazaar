import { TestBed } from '@angular/core/testing';
import { OlvideContraService } from './olvidecontra.service';
import { AlertController } from '@ionic/angular';

// Mock de HTMLIonAlertElement con las propiedades necesarias
class MockAlert implements HTMLIonAlertElement {
  // Simulamos solo las propiedades necesarias
  present = jasmine.createSpy('present');
  addEventListener: any;
  removeEventListener: any;
  animated: boolean = false;
  backdropDismiss: boolean = true;
  cssClass: string = '';
  mode: string = '';
  message: string = '';
  header: string = '';
  buttons: any[] = [];
}

describe('OlvideContraService', () => {
  let service: OlvideContraService;
  let alertControllerMock: jasmine.SpyObj<AlertController>;

  beforeEach(() => {
    // Crear el mock para AlertController con el método 'create'
    alertControllerMock = jasmine.createSpyObj('AlertController', ['create']);

    // Configurar el mock para que 'create' devuelva una promesa resuelta con un objeto MockAlert
    alertControllerMock.create.and.returnValue(Promise.resolve(new MockAlert()));

    // Configurar el TestBed con el mock y el servicio
    TestBed.configureTestingModule({
      providers: [
        OlvideContraService,
        { provide: AlertController, useValue: alertControllerMock }
      ]
    });

    // Inyectar el servicio
    service = TestBed.inject(OlvideContraService);
  });

  it('should be created', () => {
    // Verificar que el servicio se haya creado correctamente
    expect(service).toBeTruthy();
  });

  it('should call alertController.create and present on mostrarAlerta', async () => {
    const header = 'Test Header';
    const message = 'Test Message';

    // Llamamos al método que debería invocar `alertController.create` y luego `present`
    await service.mostrarAlerta(header, message);

    // Verificar que `create` fue llamado con los parámetros correctos
    expect(alertControllerMock.create).toHaveBeenCalledWith({
      header: header,
      message: message,
      buttons: ['OK']
    });

    // Verificar que `present` fue llamado
    const alertInstance = await alertControllerMock.create.calls.mostRecent().returnValue;
    expect(alertInstance.present).toHaveBeenCalled();
  });
});
