import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestionCreationPageComponent } from './question-creation-page.component';

describe('QuestionCreationPageComponent', () => {
  let component: QuestionCreationPageComponent;
  let fixture: ComponentFixture<QuestionCreationPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCreationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
