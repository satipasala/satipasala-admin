import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestionnaireInfoPage } from './questionnaire-info-page.component';

describe('QuestionnaireInfoPageComponent', () => {
  let component: QuestionnaireInfoPage;
  let fixture: ComponentFixture<QuestionnaireInfoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireInfoPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
