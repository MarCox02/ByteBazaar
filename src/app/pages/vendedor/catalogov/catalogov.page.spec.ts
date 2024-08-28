import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogovPage } from './catalogov.page';

describe('CatalogovPage', () => {
  let component: CatalogovPage;
  let fixture: ComponentFixture<CatalogovPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogovPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
