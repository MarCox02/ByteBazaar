import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarPage } from './registrar.page';

describe('RegistrarPage', () => {
  let component: RegistrarPage;
  let fixture: ComponentFixture<RegistrarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
