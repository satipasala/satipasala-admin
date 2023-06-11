import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourseSubMenuComponent } from './course-sub-menu.component';
import { MaterialModule } from 'apps/admin/src/app/imports/material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('CourseSubMenuComponent', () => {
  let component: CourseSubMenuComponent;
  let fixture: ComponentFixture<CourseSubMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSubMenuComponent ],
      imports: [
        MaterialModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
