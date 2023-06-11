import {Component, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUploadComponent} from "../../../uploads/file-upload/file-upload.component";
import {
  AuthService,
  Course,
  Event,
  EventsService,
  GlobalSearchService,
  NotificationService,
  OrderBy,
  SearchFilter,
  SidenavService,
  User
} from "@satipasala/base";
import {ActivatedRoute} from "@angular/router";
import {FilterGroup} from 'libs/base/src/lib/impl/FirebaseDataSource';
import {Subscription} from "rxjs";
import {Program} from "../../../../../../../../libs/base/src/lib/model/Course";
import {EventSessionService} from "../../../../../../../../libs/base/src/lib/services/event-session.service";

import {formatDate} from '@angular/common'
import {EventSession, SESSION_NOT_STARTED} from "../../../../../../../../libs/base/src/lib/model/EventSession";
import {electron} from "webpack";

@Component({
  selector: 'admin-event-session-form',
  templateUrl: './event-session-form.component.html',
  styleUrls: ['./event-session-form.component.scss']
})
export class EventSessionFormComponent {

  @ViewChild("uploadComponent", {static: false})
  uploadComponent: FileUploadComponent;

  //Properties for the search component
  defaultOrderBy: OrderBy[] = [{fieldPath: 'name', directionStr: 'asc'}];
  defaultSearchFields: string[] = ['name'];
  defaultDisplayField: string = 'name';

  // Properties for filtering facilitators
  facilitatorSearchBy: SearchFilter[] = [];
  usersOrderBy: OrderBy[] = [{fieldPath: 'email', directionStr: 'asc'}];
  facilitatorFilterBy: FilterGroup[] = [];
  userSearchFields: string[] = ['displayName', 'email'];
  facilitatorDisplayField: string = 'displayName';
  facilitatorSearchSubscription: Subscription;
  eventSessionForm: FormGroup;// Form
  private _satiEvent: Event; // Model Object
  private _eventSession: EventSession;
  mode: "add" | "view" | "edit"; // "add","view","edit"

  coordinator: User;
  program: Program;
  coodinatorEmail: string;
  coodinatorNumber: string;
  facilitatorForm: FormGroup;
  participationForm: FormGroup;
  subscription;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private searchFilterService: GlobalSearchService,
              private eventsService: EventsService,
              private eventSessionService: EventSessionService,
              private sidenavService: SidenavService,
              private notificationService: NotificationService,
              private authService: AuthService) {

    const facilitatorFilter: FilterGroup = new FilterGroup("event-facilitators");
    facilitatorFilter.filters.push({
      fieldPath: "userRole.roleLevel.id",
      opStr: "in",
      value: ['facilitator', 'admin', 'organization_admin', 'super_admin']
    });
    this.facilitatorFilterBy.push(facilitatorFilter);

    this.buildForm();

    this.subscription = this.route.queryParams.subscribe(queryParams => {

      this.setMode(queryParams)

      if (queryParams.sessionId) {
        this.eventSessionService.get(queryParams.sessionId).subscribe(event => {
            this.eventSession = event;
            if (!this.satiEvent) {
              this.populateEvent(this.eventSession.eventId)
            }
          }, err => {
            this.notificationService.showErrorNotification("Error retrieving session", err);
          }
        );
      } else if (queryParams.eventId) {
        this.populateEvent(queryParams.eventId);
      } else {
        this.notificationService.showErrorNotification("Error navigation session");
      }
    });

    if (this.mode === 'add') {
      this.authService.getCurrentDbUser().subscribe(user => {
        this.coordinator = user;
        this.eventSessionForm.patchValue({
          coordinatorInfo: user
        });
        this.coodinatorEmail = user.email;
        this.coodinatorNumber = user.phoneNumber;
      });
    }

    this.facilitatorSearchSubscription = this.searchFilterService.connect(this.userSearchFields, filters => this.facilitatorSearchBy = filters, error => alert(error));
  }

  populateEvent(eventId) {
    this.eventsService.get(eventId).subscribe(event => {
        this.satiEvent = event;
        this.fillForm();
      }, err => {
        this.notificationService.showErrorNotification("Error retrieving event", err);
      }
    );
  }

  ngOnDestroy(): void {
    this.facilitatorSearchSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  buildForm() {
    this.eventSessionForm = this.formBuilder.group({
      'id': [''],
      'eventId': ['', Validators.required],
      'name': ['', Validators.required],
      'disabled': [true],
      'startDate': ['', Validators.required],
      'endDate': ['', Validators.required],
      'startTime': ['', Validators.required],
      'endTime': ['', Validators.required],
      'description': [''],
      'imgUrls': [''],
      'coordinatorInfo': [{}, Validators.required],
      'program': ['', Validators.required],
      'facilitators': [{}],
      'participation': [{}],
      'status': [SESSION_NOT_STARTED]
    });

    // need to attach this to eventForm
    this.facilitatorForm = this.formBuilder.group({
      'facilitators': new FormArray([])
    });

    this.participationForm = this.formBuilder.group({
      'participation': new FormArray([])
    });

  }

  get satiEvent(): Event {
    return this._satiEvent;
  }

  set satiEvent(value: Event) {
    this._satiEvent = value;
    this.program = {...this.satiEvent.program};
  }

  get eventSession(): EventSession {
    return this._eventSession;
  }

  set eventSession(value: EventSession) {
    this._eventSession = value;
  }


  get participants(): any {
    return this.eventSessionForm.get('participants');
  }

  updateEventName() {
    let generatedName = this.eventSessionForm.controls['host'].value?.name + ' - '
      + this.eventSessionForm.controls['program'].value?.name /*+ ' on '
        + this.eventForm.controls['startDate'].value;*/
    this.eventSessionForm.controls['name'].setValue(generatedName);
  }

  onSubmit() {
    let facilitators = this._satiEvent.facilitators;
    let participation = this._satiEvent.participation;
    this._eventSession = this.eventSessionForm.value as EventSession;
    this._eventSession.facilitators = facilitators;
    this._eventSession.participation = participation;
    this._eventSession.coordinatorInfo = this.coordinator;
    this._eventSession.coordinatorInfo.phoneNumber = this.coodinatorNumber;

    // Upload images and set path to model object
    if (this._eventSession.imgUrls === null) {
      this._eventSession.imgUrls = [];
    }
    if (this.mode === 'edit') {
      this.uploadComponent.putFiles();
      if (this.uploadComponent.startUpload) {
        this._eventSession.imgUrls[0] = "event_pictures/" + this.eventSessionForm.value['id'];
        // add or update event will be triggered by the file upload listener set in the UI (uploadComplete)
      } else {
        this.addOrUpdateEvent(); // No file upload is pending, directly update event.
      }
    } else {
      this.addOrUpdateEvent();
    }
  }

  /**
   * Add or update event based on action
   */
  addOrUpdateEvent() {
    if (this.mode === "edit") {
      this.updateEvent();
    } else if (this.mode === "add") {
      this.addEvent();

    }
  }

  // reset() {
  //   this.eventForm.reset();
  //   this.fillForm();
  // }

  addEvent() {
    this.notificationService.startLoadingIndicator();
    this.eventSessionService.add(this._eventSession).then(() => {
      this.notificationService.showSuccessNotification("Sesion created successfully");
      this.back();
    }).catch(err => {
      this.notificationService.showErrorNotification("Session creation failed", err);
    })
  }

  updateEvent() {
    this.notificationService.startLoadingIndicator();
    this.eventSessionService.update(this._eventSession.id, this._eventSession).then(() => {
      this.notificationService.showSuccessNotification("Session updated successfully");
      this.back();
    }).catch(err => {
      this.notificationService.showErrorNotification("Session update failed", err);
    });
  }

  fillForm() {
    if (this.eventSession) {
      this.eventSessionForm.patchValue(this._eventSession as any);
      this.coodinatorEmail = this._eventSession.coordinatorInfo.email;
      this.coodinatorNumber = this._eventSession.coordinatorInfo.phoneNumber;
      this.coordinator = this._eventSession.coordinatorInfo;
    } else if (this.satiEvent) {
      let satiEvent = {...this.satiEvent}
      satiEvent.program.courses = {};
      this.eventSessionForm.patchValue(satiEvent as any);
      this.eventSessionForm.patchValue({id: '', eventId: satiEvent.id})
      this.coodinatorEmail = satiEvent.coordinatorInfo.email;
      this.coodinatorNumber = satiEvent.coordinatorInfo.phoneNumber;
      this.coordinator = satiEvent.coordinatorInfo;
    }


    if (this.mode === "add") {
      let date = new Date();
      this.eventSessionForm.patchValue({
        'startDate': formatDate(date, 'yyyy-MM-dd', 'en'),
        'endDate': formatDate(date, 'yyyy-MM-dd', 'en'),
        'startTime': formatDate(date, 'hh-mm', 'en'),
        'endTime': formatDate(date, 'hh-mm', 'en')
      })
      this.eventSessionForm.patchValue({
        started: SESSION_NOT_STARTED
      })

      this._eventSession = this.eventSessionForm.getRawValue();
    }
  }

  back() {
    this.sidenavService.close();
  }

  onSelectProgram(courseData: Program) {
    this.program = courseData;
  }

  onSelectCoodinator(coordinatorData: User) {
    this.coordinator = coordinatorData;
    this.coodinatorEmail = coordinatorData.email;
    this.coodinatorNumber = coordinatorData.phoneNumber;
  }

  onCourseChange(checkbox: boolean, key: string, course: Course) {
    (checkbox) ? course.active = 'Yes' : course.active = 'No';
    if(checkbox){
      this.eventSession.program.courses[key] = course;
    }else{
      delete  this.eventSession.program.courses[key];
    }

  }

  isCourseChecked(course: any) {
    let sessionCourse = this._eventSession.program.courses[course.id];
    return sessionCourse?sessionCourse.active == 'Yes':false;
  }

  getImageLocation() {
    return 'session_pictures/' + this.satiEvent.id
  }

  private setMode(queryParams: any) {
    if (queryParams.sessionId == undefined) {
      this.mode = "add";
    } else if (queryParams.action === "view") {
      this.mode = "view";
    } else {
      this.mode = "edit";
    }
  }
}
