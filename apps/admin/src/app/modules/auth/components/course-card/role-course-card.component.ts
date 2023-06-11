import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {Course, PermissionsService, Role} from "@satipasala/base";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'admin-role-course-card',
  templateUrl: './role-course-card.component.html',
  styleUrls: ['./role-course-card.component.scss']
})
export class RoleCourseCardComponent implements OnInit {

  @Input()
  course: Course;

  @Input()
  formGroup: FormGroup;

  @Output()
  isCourseSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _role: Role;
  courseForm: FormGroup;

  rolePermission: Object;

  constructor(private permissionsService: PermissionsService) {
    this.permissionsService.isRoleAuthorized('collection_roles').then(permission => this.rolePermission = permission).catch(err => console.error(err));
    this.courseForm = new FormGroup({
      course: new FormControl(),
      roleCourseCheckBox: new FormControl(),
      roleCourseMandatory: new FormControl()
    });
  }

  @Input()
  set role(value: Role) {
    this._role = value;
    if (this._role) {
      this.courseForm.patchValue({
        course: this.course,
        roleCourseCheckBox: this.isCourseAssigned(),
        roleCourseMandatory: this.isCourseMandatory()
      });
    }
  }

  get role(): Role {
    return this._role;
  }

  ngOnInit(): void {
    (this.formGroup.controls['items'] as FormArray).push(this.courseForm);
  }

  isCourseAssigned(): boolean {
    if (this._role.courses) {
      return this._role.courses[this.course.id] !== undefined;
    }
    return false;
  }

  isCourseMandatory(): boolean {
    if (this._role.courses && this._role.courses[this.course.id] && this._role.courses[this.course.id].mandatory) {
      return this._role.courses[this.course.id].mandatory;
    }
    return false;
  }

  isReadyForSubmission() {
    this.isCourseSelected.emit(true);
  }

  getActivityCount(course: Course):number {
    return Object.keys(course?.activities).length
  }
}
