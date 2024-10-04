import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoletaPage } from './boleta.page';

describe('BoletaPage', () => {
  let component: BoletaPage;
  let fixture: ComponentFixture<BoletaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
