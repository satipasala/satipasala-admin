import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SQuestionComponent } from './question.component';

describe('QuestionComponent', () => {
  let component: SQuestionComponent;
  let fixture: ComponentFixture<SQuestionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
