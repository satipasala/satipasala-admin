import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SFieldError } from './s-field-error.component';

describe('FieldErrorComponent', () => {
  let component: SFieldError;
  let fixture: ComponentFixture<SFieldError>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SFieldError ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SFieldError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
