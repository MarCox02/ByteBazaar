import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductocPage } from './productoc.page';

describe('ProductocPage', () => {
  let component: ProductocPage;
  let fixture: ComponentFixture<ProductocPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
