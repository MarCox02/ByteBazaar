import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPerfilcPage } from './editar-perfilc.page';

describe('EditarPerfilcPage', () => {
  let component: EditarPerfilcPage;
  let fixture: ComponentFixture<EditarPerfilcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPerfilcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
