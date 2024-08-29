import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilvPage } from './perfilv.page';

describe('PerfilvPage', () => {
  let component: PerfilvPage;
  let fixture: ComponentFixture<PerfilvPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
