import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourseFormComponent } from './course-form.component';
import {CoreModule, DynamicFormComponent, ErrorStateMatcherFactory} from "@satipasala/core";


describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[ErrorStateMatcherFactory],
      declarations: [ CourseFormComponent,DynamicFormComponent ],
      imports:[CoreModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
