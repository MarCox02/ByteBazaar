import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilcPage } from './perfilc.page';

describe('PerfilcPage', () => {
  let component: PerfilcPage;
  let fixture: ComponentFixture<PerfilcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
