import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdittarjetaPage } from './edittarjeta.page';

describe('EdittarjetaPage', () => {
  let component: EdittarjetaPage;
  let fixture: ComponentFixture<EdittarjetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittarjetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
