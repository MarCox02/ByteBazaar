import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DireccionPage } from './direccion.page';

describe('DireccionPage', () => {
  let component: DireccionPage;
  let fixture: ComponentFixture<DireccionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
