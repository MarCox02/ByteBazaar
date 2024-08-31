import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OlvideContravPage } from './olvide-contrav.page';

describe('OlvideContravPage', () => {
  let component: OlvideContravPage;
  let fixture: ComponentFixture<OlvideContravPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvideContravPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
