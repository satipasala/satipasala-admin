import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExampleTelInputComponent } from './example-tel-input.component';

describe('ExampleTelInputComponent', () => {
  let component: ExampleTelInputComponent;
  let fixture: ComponentFixture<ExampleTelInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleTelInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleTelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
