import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourseAssignToUserPage } from './course-assign-to-user-page.component';

describe('CourseAssignToUserPageComponent', () => {
  let component: CourseAssignToUserPage;
  let fixture: ComponentFixture<CourseAssignToUserPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAssignToUserPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAssignToUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
