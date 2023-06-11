import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {SQuestionnaireForm} from "./s-questionnaire-form.component";


describe('EvaluationFormComponent', () => {
  let component: SQuestionnaireForm;
  let fixture: ComponentFixture<SQuestionnaireForm>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SQuestionnaireForm ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SQuestionnaireForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
