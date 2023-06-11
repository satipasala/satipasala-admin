import {Component, Input, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy} from '@angular/core';
import {Course, User, StorageService, AuthService} from '@satipasala/base';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {CourseInfo} from "../../../../../../../../libs/base/src/lib/model/Course";

@Component({
  selector: 'admin-course-student-card',
  templateUrl: './course-student-card.component.html',
  styleUrls: ['./course-student-card.component.scss']
})
export class CourseStudentCardComponent implements OnInit,AfterViewInit,OnDestroy {



  @Output()
  onUserUpdate:EventEmitter<any> = new EventEmitter()

  @Input()
  subscriptionField:string;


  private _course: CourseInfo;
  studentForm: FormGroup;
  private _user: User;
  imageUrl: Observable<string>;

  checkAuthorizedToMarkMandatory: boolean
  checkAuthorizedToUpdateCourseState: boolean
  subscription:Subscription;

  constructor(private storeService: StorageService, private authService: AuthService) {
    this.studentForm = new FormGroup({
      user: new FormControl(),
      studentCheckBox: new FormControl(),
      studentCourseMandatory: new FormControl()
    });
  }




  @Input()
  set course(value: CourseInfo) {
    this._course = value;
  }

  get course(): CourseInfo {
    return this._course;
  }
  get user(): User {
    return this._user;
  }

  @Input()
  set user(value: User) {
    this._user = value;
    this.loadUserImage(value);
    if (this._course && this._user) {
      this.subscription?.unsubscribe();
      this.studentForm.patchValue({
        user: this.user,
        studentCheckBox: this.isCourseAssigned(),
        studentCourseMandatory: this.isCourseMandatory()
      });

      this.subscription =  this.studentForm.valueChanges.subscribe(value => {
        this.onUserUpdate.emit(this.studentForm.getRawValue())
      })

    }
  }

  isCourseAssigned(): boolean {
    return this._user[this.subscriptionField]?.[this.course.id] != null;
  }

  isCourseMandatory(): boolean {
    return this._user[this.subscriptionField]?.[this.course.id]?.mandatory == true;
  }

  private isAuthorizedToUpdateCourseState(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentAuthUser().then(user => {
        resolve(!(this._user[this.subscriptionField]?.[this.course.id]?.mandatory && this._user.email == user.email))
      }).catch(reason => resolve(false))
    })
  }

  private isAuthorizedToMarkMandatory(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getCurrentAuthUser().then(user => {
        resolve(this._user.email == user.email);
      }).catch(reason => resolve(false))
    });
  }

  loadUserImage(user: User) {
    this.imageUrl = this.storeService.getUserImagePath(user);
  }

  changeCourse() {
    if (this.studentForm.controls['studentCheckBox'].value == false) {
      this.studentForm.controls['studentCourseMandatory'].setValue(false);
    }
  }


  ngOnInit(): void {

    this.isAuthorizedToMarkMandatory().then(value => this.checkAuthorizedToMarkMandatory = value);
    this.isAuthorizedToUpdateCourseState().then(value => this.checkAuthorizedToUpdateCourseState = value);

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
