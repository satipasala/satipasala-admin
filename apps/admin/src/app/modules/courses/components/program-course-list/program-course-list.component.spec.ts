import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {ProgramCourseListComponent} from './program-course-list.component';
import {CourseActivitySubMenuComponent} from '../course-activity-sub-menu/course-activity-sub-menu.component';
import {CoursesService} from "@satipasala/base";
import {ActivatedRoute, Params} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MockFireStore} from "@satipasala/testing";
import {MaterialModule} from "../../../../imports/material.module";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";
import {MatSort} from "@angular/material/sort";

describe('CourseActivityListComponent', () => {
  let component: ProgramCourseListComponent;
  let fixture: ComponentFixture<ProgramCourseListComponent>;
  let params:Params = {id: 1}
  const fakeActivatedRoute = {
    params: of(params)
  } as ActivatedRoute;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

      providers: [CoursesService, MatSort,{provide: ActivatedRoute, useValue: fakeActivatedRoute},{provide: AngularFirestore, useValue: MockFireStore}],
      declarations: [ProgramCourseListComponent, CourseActivitySubMenuComponent],
      imports: [
        MaterialModule,
        RouterTestingModule.withRoutes([]),
        NoopAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
