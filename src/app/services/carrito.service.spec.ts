import { TestBed } from '@angular/core/testing';
import { CarritoService } from './carrito.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { of } from 'rxjs';

describe('CarritoService', () => {
  let service: CarritoService;
  let nativeStorageSpy: jasmine.SpyObj<NativeStorage>;

  beforeEach(() => {
    // Crea un espía de NativeStorage
    nativeStorageSpy = jasmine.createSpyObj('NativeStorage', ['getItem', 'setItem']);

    TestBed.configureTestingModule({
      providers: [
        CarritoService,
        { provide: NativeStorage, useValue: nativeStorageSpy } // Usa el espía de NativeStorage
      ]
    });

    service = TestBed.inject(CarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio fue creado correctamente
  });
});
