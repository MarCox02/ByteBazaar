import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogincPage } from './loginc.page';

describe('LogincPage', () => {
  let component: LogincPage;
  let fixture: ComponentFixture<LogincPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogincPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
