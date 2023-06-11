import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import {
  Activity,
  Course,
  CoursesService,
  NotificationService,
  Questionnaire,
  QuestionnaireService,
  SidenavService,
  OrderBy,
  SearchFilter, GlobalSearchService
} from "@satipasala/base";
import { FilterGroup } from 'libs/base/src/lib/impl/FirebaseDataSource';
import {Subscription} from "rxjs";

@Component({
  selector: 'admin-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  static editMode: "edit" = "edit";
  static addMode: "add" = "add";
  mode: "edit" | "add";

  courseForm: FormGroup;

  public course: Course;

  public activityAll: Activity[] = [];

  public questionnaires: Questionnaire[] = [];

  public formTitle: string;
  public submitBtnText: string;
  activityForm: FormGroup;

  searchFields: string[] = ['name'];
  orderBy: OrderBy[] = [{ fieldPath: 'name', directionStr: 'asc' }];
  searchBy: SearchFilter[] = [];
  filterBy: FilterGroup[];

  activitySearchSubscription: Subscription;

  get questionnaire(): string {
    if (this.course.questionnaire) {
      return this.course.questionnaire.name;
    } else {
      return null;
    }

  }

  set questionnaire(questionnaireName: string) {
    this.courseForm.patchValue({ questionnaire: questionnaireName });
    this.course.questionnaire = this.questionnaires.filter(questionnaire => questionnaire.name === questionnaireName)[0]
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private questionnaireService: QuestionnaireService,
    private sideNavService: SidenavService,
    private notificationService: NotificationService,
    private searchFilterService:GlobalSearchService
  ) {
  }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [''],
      facilitatorsCount: [null, Validators.compose([
        Validators.required, Validators.min(1), Validators.max(5)])
      ],
      numberOfFeedback: [null, Validators.compose([
        Validators.required, Validators.min(1), Validators.max(10)])
      ],
      questionnaire: [null, Validators.required]
    });

    // need to attach this to courseForm
    this.activityForm = this.formBuilder.group({
      'activities': new FormArray([])
    });


    // Load all activities (ReferenceData here)
    // this.referenceDataService.getData<Activity>(RefDataType.ACTIVITY, true).subscribe(activities => {
    //   this.activityAll = activities;
    // });

    /* this.referenceDataService.getQuestionnaires().subscribe(questionnaires => {
       this.questionnaires = questionnaires;
     });*/

    this.questionnaireService.getAll().subscribe(questionnaires => {
      this.questionnaires = questionnaires;
    });


    /*This form receives edit, view, new*/
    this.route.params.subscribe(params => {

      if (params.courseId === 'new') {
        this.mode = CourseFormComponent.addMode;
        this.formTitle = "Create Course";
        this.submitBtnText = "Add";
        let course = <Course>{
          activities: {},
          facilitatorsCount: 0,
          status: 'notstarted',
          description: '',
          mandatory: false
        };
        this.fillForm(course);
      } else if (params.action === 'edit') {
        this.mode = CourseFormComponent.editMode;
        this.formTitle = "Edit Course";
        this.submitBtnText = "Update";
        this.coursesService.get(params.courseId).subscribe(course => {
          this.fillForm(course);
        }, err => {
          this.notificationService.showErrorNotification("Error retrieving course", err);
          setTimeout(() => {
            this.back();
          }, 1000)
        }
        )
      } else {
        this.back();
      }
    });
    this.activitySearchSubscription = this.searchFilterService.connect(this.searchFields,
      filters => this.searchBy = filters, error => alert(error));
  }

  ngOnDestroy(): void {
    this.activitySearchSubscription.unsubscribe();
  }
  fillForm(course: Course) {
    this.course = course;

    this.courseForm.patchValue({
      name: this.course.name,
      description: this.course.description,
      facilitators: this.course.facilitatorsCount,
      numberOfFeedback: this.course.numberOfFeedback,
      activities: this.course.activities,
    });

    if (this.course.questionnaire) {
      this.courseForm.patchValue({
        questionnaire: this.course.questionnaire.name
      });
    }
    this.course.tempActivities = {...this.course.activities}
  }

  onActivitiesChange() {
    this.courseForm.patchValue({ activities: this.course.activities })
  }


  onSubmit() {


    this.course.activities = {...this.course.tempActivities};
    delete this.course['tempActivities'];
    switch (this.mode) {
      case CourseFormComponent.addMode:
        this.addCourse();
        break;
      case CourseFormComponent.editMode:
        this.updateCourse();
        break;
    }
  }

  updateCourse() {

    this.notificationService.startLoadingIndicator();
    this.coursesService.update(this.course.id, this.course).then(() => {
      this.notificationService.showSuccessNotification("Course updated successfully");
      this.back();
    }).catch(err => {
      this.notificationService.showErrorNotification("Failed to update course", err);
    });
  }

  addCourse() {
    this.notificationService.startLoadingIndicator();
    this.course.id = this.getCourseId();
    this.coursesService.setDoc(this.course.id, this.course).then(() => {
      this.notificationService.showSuccessNotification("Course created successfully");
      this.back();
    }).catch(err => {
      this.notificationService.showErrorNotification("Failed to add course", err)
    })
  }

  getCourseId() {
    return this.course.name.trim().replace(/\s+/g, "_").toUpperCase();
  }

  back() {
    this.sideNavService.close();
  }

}
