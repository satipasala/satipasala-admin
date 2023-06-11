import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestionnaireStepperComponent } from './questionnaire-stepper.component';

describe('QuestionnaireStepperComponent', () => {
  let component: QuestionnaireStepperComponent;
  let fixture: ComponentFixture<QuestionnaireStepperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
