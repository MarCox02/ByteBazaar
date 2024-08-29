import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificacionvPage } from './notificacionv.page';

describe('NotificacionvPage', () => {
  let component: NotificacionvPage;
  let fixture: ComponentFixture<NotificacionvPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
