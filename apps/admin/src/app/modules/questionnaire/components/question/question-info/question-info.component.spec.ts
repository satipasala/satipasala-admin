import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestionInfoComponent } from './question-info.component';

describe('QuestionInfoComponent', () => {
  let component: QuestionInfoComponent;
  let fixture: ComponentFixture<QuestionInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
