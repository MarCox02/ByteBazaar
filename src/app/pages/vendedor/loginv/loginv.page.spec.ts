import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginvPage } from './loginv.page';

describe('LoginvPage', () => {
  let component: LoginvPage;
  let fixture: ComponentFixture<LoginvPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
