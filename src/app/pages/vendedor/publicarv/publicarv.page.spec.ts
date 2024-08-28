import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicarvPage } from './publicarv.page';

describe('PublicarvPage', () => {
  let component: PublicarvPage;
  let fixture: ComponentFixture<PublicarvPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
