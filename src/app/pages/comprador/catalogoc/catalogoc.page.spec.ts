import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogocPage } from './catalogoc.page';

describe('CatalogocPage', () => {
  let component: CatalogocPage;
  let fixture: ComponentFixture<CatalogocPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
