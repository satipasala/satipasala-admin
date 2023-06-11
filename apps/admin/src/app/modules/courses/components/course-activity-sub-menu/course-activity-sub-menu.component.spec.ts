import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CourseActivitySubMenuComponent } from './course-activity-sub-menu.component';
import { MaterialModule } from 'apps/admin/src/app/imports/material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ActivitySubMenuComponent', () => {
  let component: CourseActivitySubMenuComponent;
  let fixture: ComponentFixture<CourseActivitySubMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseActivitySubMenuComponent ],
      imports: [
        MaterialModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseActivitySubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
