import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestionsPage } from './questionns-page.component';

describe('QuestionnsPageComponent', () => {
  let component: QuestionsPage;
  let fixture: ComponentFixture<QuestionsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
