import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepThreeConfirmComponent } from './step-three-confirm.component';

describe('StepThreeConfirmComponent', () => {
  let component: StepThreeConfirmComponent;
  let fixture: ComponentFixture<StepThreeConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepThreeConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepThreeConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
