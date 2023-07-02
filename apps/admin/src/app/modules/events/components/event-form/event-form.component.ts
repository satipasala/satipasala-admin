import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUploadComponent} from "../../../uploads/file-upload/file-upload.component";
import {
  AuthService,
  Course,
  Event,
  EventCategory,
  EventsService,
  GlobalSearchService,
  Host,
  NotificationService,
  ObjectUtils,
  OrderBy,
  RefDataType,
  ReferenceDataService,
  SearchFilter,
  SidenavService, StorageService,
  User
} from "@satipasala/base";
import {ActivatedRoute} from "@angular/router";
import { v4 as uuidv4 } from 'uuid';
import {AddressFormComponent} from '../../../core/components/address-form/address-form.component';
import {FilterGroup} from 'libs/base/src/lib/impl/FirebaseDataSource';
import {Subscription} from "rxjs";
import {Program} from "../../../../../../../../libs/base/src/lib/model/Course";

@Component({
  selector: 'admin-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {

  @ViewChildren(AddressFormComponent) addressFormComponents: QueryList<AddressFormComponent>;

  @ViewChild("uploadComponent", {static: false})
  uploadComponent: FileUploadComponent;

  //Properties for the search component
  defaultOrderBy: OrderBy[] = [{fieldPath: 'name', directionStr: 'asc'}];
  defaultSearchFields: string[] = ['name'];
  defaultDisplayField: string = 'name';

  // Properties for filtering facilitators
  facilitatorSearchBy: SearchFilter[] = [];
  facilitatorOrderBy: OrderBy[] = [{fieldPath: 'email', directionStr: 'asc'}];
  facilitatorFilterBy: FilterGroup[] = [];
  facilitatorSearchFields: string[] = ['displayName', 'email'];
  facilitatorDisplayField: string = 'displayName';
  facilitatorSearchSubscription: Subscription;
  eventForm: FormGroup;// Form
  participationForm: FormGroup;
  usersOrderBy: OrderBy[] = [{fieldPath: 'email', directionStr: 'asc'}];
  private _satiEvent: Event; // Model Object
  mode: string; // "add","view","edit"
  host: Host;
  coordinator: User;
  program: Program;
  organizationType: string;
  activityList: [] = [];

  eventCategories: EventCategory[];
  selectedEventCategory: string;
  coodinatorEmail: string;
  coodinatorNumber: string;
  facilitatorForm: FormGroup;
  defaultImage: string;
  subscriptions:Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private searchFilterService: GlobalSearchService,
              private eventsService: EventsService,
              private sidenavService: SidenavService,
              private notificationService: NotificationService,
              private authService: AuthService,
              private referenceDataServie: ReferenceDataService,
              private storeService: StorageService) {

    const facilitatorFilter: FilterGroup = new FilterGroup("event-facilitators");
    facilitatorFilter.filters.push({
      fieldPath: "userRole.roleLevel.id",
      opStr: "in",
      value: ['facilitator', 'admin', 'organization_admin', 'super_admin']
    });
    this.facilitatorFilterBy.push(facilitatorFilter);

    this.buildForm();

    this.referenceDataServie.getData<EventCategory>(RefDataType.EVENT_CATEGORY, true).subscribe(dataArr => {
      this.eventCategories = dataArr;
      this.route.queryParams.subscribe(queryParams => {
        if (queryParams.eventId == undefined) {
          this.mode = "add";
          this.satiEvent = <Event>{
            id: uuidv4(),
            disabled: false,
            imgUrls: []
          };
        } else {
          this.subscriptions.push(this.eventsService.get(queryParams.eventId).subscribe(event => {
              if (queryParams.action === "view") {
                this.mode = "view";
              } else {
                this.mode = "edit";
              }
              this.satiEvent = event;
            }, err => {
              this.notificationService.showErrorNotification("Error retrieving course", err);
            }
          ));
        }
      });

      if (this.mode === 'add') {
        this.subscriptions.push(this.authService.getCurrentDbUser().subscribe(user => {
          this.coordinator = user;
          this.eventForm.patchValue({
            coordinatorInfo: user
          });
          this.coodinatorEmail = user.email;
          this.coodinatorNumber = user.phoneNumber;
        }));
      }
    });
    this.subscriptions.push(
      this.searchFilterService.connect(this.facilitatorSearchFields,filters => this.facilitatorSearchBy = filters, error => alert(error))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription=> subscription.unsubscribe() )
  }

  buildForm() {
    this.eventForm = this.formBuilder.group({
      'id': [''],
      'name': ['', Validators.required],
      'disabled': [],
      'startDate': ['', Validators.required],
      'endDate': [],
      'startTime': [],
      'endTime': [],
      'description': [],
      'imgUrls': [],
      'coordinatorInfo': ['', Validators.required],
      'category': ['', Validators.required],
      'type': ['', [Validators.required]],
      'participants': this.formBuilder.group({
        'numberOfParticipants': [0, [Validators.required, Validators.pattern("^[0-9]*$")]],
        'numberOfAdults': [0, [Validators.pattern("^[0-9]*$")]],
        'numberOfChildren': [0, [Validators.pattern("^[0-9]*$")]],
        'numberOfMales': [0, [Validators.pattern("^[0-9]*$")]],
        'numberOfFemales': [0, [Validators.pattern("^[0-9]*$")]]
      }),
      'program': ['', Validators.required],
      'host': ['', Validators.required]
    });

    // need to attach this to eventForm
    this.facilitatorForm = this.formBuilder.group({
      'facilitators': new FormArray([])
    });

    this.participationForm = this.formBuilder.group({
      'participation': new FormArray([])
    });

    this.eventForm.controls['host'].valueChanges.subscribe(host => {
      if (host.name) {
        this.updateEventName();
      }
      if (host.addressInfo) {
        this.eventForm.patchValue({addressInfo: host.addressInfo})
      }
    })
    this.eventForm.controls['program'].valueChanges.subscribe(() => this.updateEventName())
    //this.eventForm.controls['startDate'].valueChanges.subscribe(() => this.updateEventName())
  }

  get satiEvent(): Event {
    return this._satiEvent;
  }

  set satiEvent(value: Event) {

    this._satiEvent = value;
    this._satiEvent.startDate = ObjectUtils.convertFirebaseTimestamp(this._satiEvent.startDate);
    this._satiEvent.endDate = ObjectUtils.convertFirebaseTimestamp(this._satiEvent.startDate);
    //added this way because address from is not initialized before fill form
    if (this.mode !== 'add') {
      this.addressFormComponents.changes.subscribe(() => {
        if (this.addressFormComponents.length) {
          this.addressFormComponents.first.parentForm = this.eventForm;
          this.addressFormComponents.first.disabled = this.mode === 'view';
          this.fillForm();
        }
      })
    }
    this.subscriptions.push( this.storeService.getDefaultMediaPath(value.mediaFiles, "assets/images/location.jpg").subscribe(value1 =>
      this.defaultImage = value1
    ))

  }

  get participants(): any {
    return this.eventForm.get('participants');
  }
 
  updateEventName() {
    let generatedName = this.eventForm.controls['host'].value?.name + ' - '
      + this.eventForm.controls['program'].value?.name /*+ ' on '
        + this.eventForm.controls['startDate'].value;*/
    this.eventForm.controls['name'].setValue(generatedName);

  }


  // getSelectedHost() {
  //   if (this.satiEvent != null && this.satiEvent.location != null) {
  //     return this.hosts.find(host => host.name === this.satiEvent.location.name);
  //   } else {
  //     return null;
  //   }
  // }

  // genTitle(host) {
  //   const title = this.eventForm.value['title'];
  //   if (title === null) {
  //     this.eventForm.patchValue({
  //       title: this.eventForm.value['name'] + " at " + host.name
  //     });
  //   }
  // }

  onSubmit() {
    let facilitators = this._satiEvent.facilitators;
    let participation = this._satiEvent.participation;
    this._satiEvent = this.eventForm.value as Event;
    this._satiEvent.facilitators = facilitators;
    this._satiEvent.participation = participation;
    this._satiEvent.program = this.program;
    this._satiEvent.coordinatorInfo = this.coordinator;
    this.satiEvent.coordinatorInfo.phoneNumber = this.coodinatorNumber;
    this._satiEvent.host = this.host;
    this.eventCategories.forEach(category => (this.selectedEventCategory === category.id) ? this._satiEvent.category = category : ''); 
    this._satiEvent.startDate = ObjectUtils.getTimeStamp(this._satiEvent.startDate);
    this._satiEvent.endDate = ObjectUtils.getTimeStamp(this._satiEvent.endDate);
    // Upload images and set path to model object
    if (this._satiEvent.imgUrls === null) {
      this._satiEvent.imgUrls = [];
    }
    if (this.mode === 'edit') {
      this.uploadComponent.putFiles();
      if (this.uploadComponent.startUpload) {
        this._satiEvent.imgUrls[0] = "event_pictures/" + this.eventForm.value['id'];
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

    this.eventsService.add(this._satiEvent).then(() => {
      this.notificationService.showSuccessNotification("Event created successfully");
      this.back();
    }).catch(err => {
      this.notificationService.showErrorNotification("Event creation failed", err);
    })
  }

  updateEvent() {
    this.notificationService.startLoadingIndicator();
    this.eventsService.update(this._satiEvent.id, this._satiEvent).then(() => {
      this.notificationService.showSuccessNotification("Event updated successfully");
      this.back();
    }).catch(err => {
      this.notificationService.showErrorNotification("Event update failed", err);
    });
  }

  fillForm() {
    this.eventForm.patchValue(this._satiEvent as any);
    this.coodinatorEmail = this._satiEvent.coordinatorInfo.email;
    this.coodinatorNumber = this._satiEvent.coordinatorInfo.phoneNumber;
    this.coordinator = this.satiEvent.coordinatorInfo;
    this.host = this.satiEvent.host;
    this.program = this.satiEvent.program;
    this.organizationType = this.satiEvent.host.type.name;
    this.selectedEventCategory = this.satiEvent.category['id'];
  }

  back() {
    this.sidenavService.close();
  }

  onSelectHost(hostData: Host) {
    this.host = hostData;
    this.organizationType = hostData.type.name;
  }

  onSelectProgram(courseData: Program) {
    this.program = courseData;
  }

  onSelectCoodinator(coordinatorData: User) {
    this.coordinator = coordinatorData;
    this.coodinatorEmail = coordinatorData.email;
    this.coodinatorNumber = coordinatorData.phoneNumber;
  }

  onActivityChange(checkbox: boolean, key: string, course: Course) {
    (checkbox) ? course.active = 'Yes' : course.active = 'No';
    this.program.courses[key] = course;
  }

  isLocationChecked(location: any) {
    return !location.isDisabled;
  }

  onLocationChange(checkbox: boolean, key: string, location: any) {
    location.isDisabled = !checkbox
    this.host.locations[key] = location;
  }

  isCourseChecked(course: any) {
    return course.active == 'Yes';
  }
}
