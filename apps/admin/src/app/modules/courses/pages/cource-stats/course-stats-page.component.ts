import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
import {
  Course, ObjectUtils,
  Questionnaire,
  ReferenceDataService,
  User,
  UsersService,
  NotificationService,
  PermissionsService, OrderBy,

} from "@satipasala/base";
import { Occurrence } from "../../../../../../../../libs/base/src/lib/model/Occurrence";
import { Feedback } from "../../../../../../../../libs/base/src/lib/model/Feedback";
import { FeedbackService } from "../../../../../../../../libs/base/src/lib/services/feedback.service";

import { UserInfo } from "../../../../../../../../libs/base/src/lib/model/User";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { SSearchBoxComponent } from 'libs/core/src/lib/search-box/s-search-box.component';
import { FilterGroup } from "../../../../../../../../libs/base/src/lib/impl/FirebaseDataSource";
@Component({
  selector: 'admin-cource-stats',
  templateUrl: './course-stats-page.component.html',
  styleUrls: ['./course-stats-page.component.scss']
})
export class CourseStatsPage implements OnInit, OnDestroy, AfterViewInit {


  collection: string = 'users';
  orderBy: OrderBy[] = [{ fieldPath: 'email', directionStr: 'asc' }];
  searchFields: string[] = ['displayName', 'lastName', 'firstName', 'email'];
  //Variables for the search component
  displayField: string = 'displayName';
  filterBy: FilterGroup[] = [];


  @ViewChild(SSearchBoxComponent) searchBox: SSearchBoxComponent

  private _selectedSubscription: Course;

  get selectedSubscription(): Course {
    return this._selectedSubscription;
  }

  set selectedSubscription(value: Course) {
    this._selectedSubscription = value;

    if (this._selectedSubscription.feedbacks == null) {
      this._selectedSubscription.feedbacks = {};
    }

    this.fillOccurrences(this._selectedSubscription);
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  feedbackForm: FormGroup;
  selectedStudent: User;
  submitBtnText: string = "Submit";

  occurrences: Occurrence[] = [];
  selectedOccurrence: Occurrence;
  yearList: number[] = [];
  currentYear: number;

  selectedQuestionnaire: Questionnaire;

  rolePermission: any;

  length = 100;

  constructor(private referenceDataService: ReferenceDataService,
    private feedbackService: FeedbackService,
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private permissionsService: PermissionsService
  ) {
    this.permissionsService.isRoleAuthorized('collection_feedbacks').then(permission => {
      this.rolePermission = permission;
      this.permissionsService.getUsersFilters('view').then(filters => {
        this.filterBy = filters;
      }).catch(reason => console.error('Insufficient permission to retrieve feedback. Error => %s', reason))
    }).catch(err => console.error(err));
  }

  ngOnInit() {
    this.setCurrentYear();
    this.setYearList();
    this.setSearchFilters();
    //Init FormGroup
    this.feedbackForm = this.formBuilder.group({
      year: [this.currentYear, [Validators.required]],
      course: '',
      occurrence: '',
    });

  }

  setYearList() {
    const currentYear = new Date().getFullYear();
    let startYear = 1980;
    while (startYear <= currentYear) {
      this.yearList.push(startYear++);
    }
  }


  fillOccurrences(course: Course) {
    this.occurrences = [];
    for (let i = 1; i <= course.numberOfFeedback; i++) {
      const occurence = <Occurrence>{
        name: i.toString(),
        number: i
      }
      this.occurrences.push(occurence);
    }
  }


  setSearchFilters() {
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
  }

  private setCurrentYear() {
    this.currentYear = new Date().getFullYear();
  }

  selectStudent(student: User) {

    //Handle selected Student
    this.resetStudentSpecificData();
    //Handle instances where no student is selected
    if (student == null) {
      //this.courses = [];
      return;
    }
    this.selectedStudent = student;
    this.setCourses();
  }

  resetStudentSpecificData() {
    this._selectedSubscription = null;
    this.selectedOccurrence = null;
    this.selectedQuestionnaire = null;
  }

  private setCourses() {
    //Clear existing enrollments
    //Populate the enrollments array
    if (this.selectedStudent.courseSubscriptions != null) {
      for (let e in this.selectedStudent.courseSubscriptions) {
        //this.courses.push(this.selectedStudent.courseSubscriptions[e].course);
      }
    }
  }

  addEditFeedback() {
    if (this.feedbackForm.valid == true) {
      const feedback = <Feedback>{};
      feedback.id = ObjectUtils.getFeedbackKey(<UserInfo>this.selectedStudent, this._selectedSubscription, this.selectedOccurrence);
      feedback.subscriptionId = this._selectedSubscription.id;
      feedback.courseInfo = ObjectUtils.extractCourseInfo(this._selectedSubscription);
      feedback.feedback = this.selectedQuestionnaire;
      Object.keys(feedback.feedback.questions).forEach(key => {
        // For written values
        (feedback.feedback.questions[key].type == 'text') ? feedback.feedback.questions[key].value = this.feedbackForm.value[key] : '';
      });
      feedback.occurrence = this.selectedOccurrence;
      feedback.userInfo = ObjectUtils.extractUserInfo(this.selectedStudent);
      feedback.updatedAt = new Date().toISOString();
      feedback.year = this.feedbackForm.value.year;
      const occurance = feedback.occurrence.number;
      this.selectedStudent.courseSubscriptions[feedback.courseInfo.id].feedbacks[occurance] = feedback;
      this.selectedStudent.courseSubscriptions[feedback.courseInfo.id].status = 'started';

      this.notificationService.startLoadingIndicator();
      this.usersService.update(this.selectedStudent.email, this.selectedStudent).then(() => {
        // this._selectedSubscription.feedbacks[feedback.id] = feedback;
        //course is completed only if feedbacks length is equal to number of feedbacks required.
        // if (Object.keys(this._selectedSubscription.feedbacks).length == this._selectedSubscription.numberOfFeedback) {
        //   this._selectedSubscription.status = "completed";
        // } else {
        //   this._selectedSubscription.status = "started";
        // }
        this.notificationService.showSuccessNotification("Feedback submitted successfully");
        this.clearForm();
      }).catch(err => {
        this.notificationService.showErrorNotification("Feedback submission failed", err);
      }
      );
    } else {
      this.notificationService.showErrorNotification("Required fields missing");
    }

  }

  clearForm() {
    // this.router.navigate(["/cources/"+COURSE_MANAGEMENT_INFO_ROUTE]);
    this.resetStudentSpecificData();
    this.searchBox.clearText()
  }

  courseSelected() {
    this.selectedQuestionnaire = null;
  }

  occurrenceSelected() {
    // console.log(this.selectedCourse)
    let completedQuestionniare;

    if (this._selectedSubscription.feedbacks) {
      const completedFeedback = this._selectedSubscription
        .feedbacks[this.selectedOccurrence.number];
      completedQuestionniare = completedFeedback ? completedFeedback.feedback : null;
    }

    if (completedQuestionniare == null) {
      completedQuestionniare = _.cloneDeep(this._selectedSubscription.questionnaire);
    }

    this.selectedQuestionnaire = completedQuestionniare;

  }

  onQuestionnaireSubmit() {
    console.log(this.selectedQuestionnaire);
  }

  addStudent() {
    this.router.navigateByUrl('/users/(management//leftsidebar:new-minimal)');
  }

}
