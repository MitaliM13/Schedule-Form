import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTwoDateComponent } from './step-two-date.component';

describe('StepTwoDateComponent', () => {
  let component: StepTwoDateComponent;
  let fixture: ComponentFixture<StepTwoDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepTwoDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepTwoDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
