import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditdireccionPage } from './editdireccion.page';

describe('EditdireccionPage', () => {
  let component: EditdireccionPage;
  let fixture: ComponentFixture<EditdireccionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdireccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
