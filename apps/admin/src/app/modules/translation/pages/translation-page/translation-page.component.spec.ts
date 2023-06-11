import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TranslationPage} from './translation-page.component';

describe('TranslationPageComponent', () => {
  let component: TranslationPage;
  let fixture: ComponentFixture<TranslationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationPage]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
