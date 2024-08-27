import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarvPage } from './registrarv.page';

describe('RegistrarvPage', () => {
  let component: RegistrarvPage;
  let fixture: ComponentFixture<RegistrarvPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
