import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductovPage } from './productov.page';

describe('ProductovPage', () => {
  let component: ProductovPage;
  let fixture: ComponentFixture<ProductovPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductovPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
