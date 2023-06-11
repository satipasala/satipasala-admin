import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynamicStepperForm } from './dynamic-stepper-form.component';

describe('DynamicStepperComponentComponent', () => {
  let component: DynamicStepperForm;
  let fixture: ComponentFixture<DynamicStepperForm>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicStepperForm ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicStepperForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
