import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AutoCompleteSearchComponent } from './auto-complete-search.component';

describe('AutoCompleteSearchComponent', () => {
  let component: AutoCompleteSearchComponent;
  let fixture: ComponentFixture<AutoCompleteSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
