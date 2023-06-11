import { Component, Input, OnInit } from '@angular/core';
import { Course, User } from "@satipasala/base";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'admin-user-course-card',
  templateUrl: './user-course-card.component.html',
  styleUrls: ['./user-course-card.component.scss']
})
export class UserCourseCardComponent implements OnInit {

  @Input()
  course: Course;

  @Input()
  formGroup: FormGroup;


  private _user: User;

  @Input()
  set selectedUser(value: User) {
    this._user = value;
    if (this.course) {
      this._user = value;
      this.courseForm.patchValue({
        course: this.course,
        courseCheckBox: this.isCourseAssigned(value),
        mandatoryCourseSlider: this.isCourseMandatory(value)
      });
    }
  }

  get selectedUser(): User {
    return this._user;
  }

  @Input()
  dbUser : User;

  courseForm: FormGroup;

  constructor() {
    this.courseForm = new FormGroup({
      course: new FormControl(),
      courseCheckBox: new FormControl(),
      mandatoryCourseSlider: new FormControl()
    });
  }

  ngOnInit(): void {
    (this.formGroup.controls['items'] as FormArray).push(this.courseForm);
  }

  isCourseAssigned(user : User): boolean {
    if (user?.courseSubscriptions?.[this.course.id]) {
      return true;
    } else {
      return false;
    }
  }

  isCourseMandatory(user : User): boolean {
    return user?.courseSubscriptions?.[this.course.id]?.mandatory;
  }

  isAuthorizedToUpdateCourseState(): boolean {
    return !(this._user?.courseSubscriptions[this.course.id]?.mandatory && this.isDbUser())
  }

  isDbUser(): boolean {
    return this.selectedUser.email == this.dbUser.email;
  }

  getActivityCount(course: Course): number {
    return Object.keys(course?.activities).length
  }
}
