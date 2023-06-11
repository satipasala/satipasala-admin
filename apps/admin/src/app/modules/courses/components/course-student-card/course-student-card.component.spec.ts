import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourseStudentCardComponent } from './host-student-card.component';

describe('HostStudentCardComponent', () => {
  let component: CourseStudentCardComponent;
  let fixture: ComponentFixture<CourseStudentCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseStudentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseStudentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
