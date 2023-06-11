import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestionnaireListPage } from './questionnaire-list-page.component';

describe('QuestionnairesListPageComponent', () => {
  let component: QuestionnaireListPage;
  let fixture: ComponentFixture<QuestionnaireListPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
