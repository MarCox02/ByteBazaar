import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPerfilvPage } from './editar-perfilv.page';

describe('EditarPerfilvPage', () => {
  let component: EditarPerfilvPage;
  let fixture: ComponentFixture<EditarPerfilvPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPerfilvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
