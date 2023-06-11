import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestionSubMenuComponent } from './question-sub-menu.component';

describe('QuestionSubMenuComponent', () => {
  let component: QuestionSubMenuComponent;
  let fixture: ComponentFixture<QuestionSubMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSubMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
