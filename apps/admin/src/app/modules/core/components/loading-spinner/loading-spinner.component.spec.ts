import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoadingSpinnerComponent } from './loading-spinner.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSpinnerComponent ],
      imports:[ NoopAnimationsModule,MatProgressSpinnerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
