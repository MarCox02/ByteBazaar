import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarcPage } from './registrarc.page';

describe('RegistrarcPage', () => {
  let component: RegistrarcPage;
  let fixture: ComponentFixture<RegistrarcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
