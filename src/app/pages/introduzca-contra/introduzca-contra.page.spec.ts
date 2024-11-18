import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { IntroduzcaContraPage } from './introduzca-contra.page';
import { UserService } from 'src/app/services/user.service';

describe('IntroduzcaContraPage', () => {
  let component: IntroduzcaContraPage;
  let fixture: ComponentFixture<IntroduzcaContraPage>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(waitForAsync(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockUserService = jasmine.createSpyObj('UserService', ['obtenerUsuario', 'presentAlert']);

    TestBed.configureTestingModule({
      declarations: [IntroduzcaContraPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IntroduzcaContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});