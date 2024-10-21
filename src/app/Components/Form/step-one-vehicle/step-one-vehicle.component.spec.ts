import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepOneVehicleComponent } from './step-one-vehicle.component';

describe('StepOneVehicleComponent', () => {
  let component: StepOneVehicleComponent;
  let fixture: ComponentFixture<StepOneVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepOneVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepOneVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
