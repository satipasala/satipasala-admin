import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourseAssignToHostPageComponent } from './course-assign-to-host-page.component';

describe('CourseAssignToHostPageComponent', () => {
  let component: CourseAssignToHostPageComponent;
  let fixture: ComponentFixture<CourseAssignToHostPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAssignToHostPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAssignToHostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
