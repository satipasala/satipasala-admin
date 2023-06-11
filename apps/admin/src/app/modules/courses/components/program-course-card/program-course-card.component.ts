import { Component, OnInit, Input } from '@angular/core';
import {Course, Activity, ObjectUtils} from '@satipasala/base';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import {Program} from "../../../../../../../../libs/base/src/lib/model/Course";

@Component({
  selector: 'admin-program-course-card',
  templateUrl: './program-course-card.component.html',
  styleUrls: ['./program-course-card.component.scss']
})
export class ProgramCourseCardComponent implements OnInit {

  @Input()
  program: Program;

  @Input()
  set course(value: Course) {
    this._course = value;
    this.courseForm.patchValue({
      course: this._course,
      courseCheckBox: this.isActivitySelected(this._course)
    });
  }

  get course(): Course {
    return this._course;
  }

  private _course: Course;

  imageUrl: Observable<string>;

  @Input()
  formGroup: FormGroup;

  courseForm: FormGroup;

  constructor() {
    this.courseForm = new FormGroup({
      course: new FormControl(),
      courseCheckBox: new FormControl(),
    });

    this.courseForm.get('courseCheckBox').valueChanges.subscribe(value => {
      if(value){
        this.program.tempCourses[this.course.id] = ObjectUtils.extractCourseInfo(this.course);
      }else{
        delete  this.program.tempCourses[this.course.id];
      }
    })
  }

  ngOnInit(): void {
    (this.formGroup.controls['courses'] as FormArray).push(this.courseForm);
  }

  isActivitySelected(course: Course): boolean {
    return this.program?.courses?.[course.id] || this.program?.tempCourses?.[course.id]
  }

}
