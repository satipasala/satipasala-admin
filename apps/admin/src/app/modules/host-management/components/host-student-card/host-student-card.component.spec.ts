import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HostStudentCardComponent } from './host-student-card.component';

describe('HostStudentCardComponent', () => {
  let component: HostStudentCardComponent;
  let fixture: ComponentFixture<HostStudentCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HostStudentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostStudentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
