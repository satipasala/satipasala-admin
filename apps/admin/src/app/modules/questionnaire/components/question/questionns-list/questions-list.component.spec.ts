import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestionsListComponent } from './questionns-list.component';

describe('QuestionnsListComponent', () => {
  let component: QuestionsListComponent;
  let fixture: ComponentFixture<QuestionsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
