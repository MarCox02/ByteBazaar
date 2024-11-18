import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPerfilvPage } from './editar-perfilv.page';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { Router } from '@angular/router'; // Si el componente usa Router
import { UserService } from 'src/app/services/user.service'; // Importa el servicio correspondiente
import { ServicebdService } from 'src/app/services/servicebd.service'; // Importa el servicio correspondiente
import { ActionSheetController, AlertController, MenuController } from '@ionic/angular'; // Controladores necesarios

describe('EditarPerfilvPage', () => {
  let component: EditarPerfilvPage;
  let fixture: ComponentFixture<EditarPerfilvPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()], // Importa IonicModule para componentes de Ionic
      declarations: [EditarPerfilvPage],
      providers: [
        { provide: UserService, useValue: {} }, // Mocks o instancias simuladas de los servicios
        { provide: ServicebdService, useValue: {} },
        { provide: ActionSheetController, useValue: {} },
        { provide: AlertController, useValue: {} },
        { provide: MenuController, useValue: {} },
        { provide: Router, useValue: {} } // Si usas el Router, proporciona una instancia mock
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPerfilvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });
});
