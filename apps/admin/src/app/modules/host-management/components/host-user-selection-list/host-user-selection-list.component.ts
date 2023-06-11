import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  Host,
  ObjectUtils,
  SidenavService,
  User,
  Location,
  NotificationService,
  AuthService
} from "@satipasala/base";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { FilterGroup, OrderBy } from 'libs/base/src/lib/impl/FirebaseDataSource';
import { SInfiniteScrollGrid } from '@satipasala/core';
import { HostInfo } from 'libs/base/src/lib/model/Host';

@Component({
  selector: 'admin-host-user-selection-list',
  templateUrl: './host-user-selection-list.component.html',
  styleUrls: ['./host-user-selection-list.component.css']
})
export class HostUserSelectionListComponent implements OnInit {

  @ViewChild(SInfiniteScrollGrid, { static: false }) infiniteScroll: SInfiniteScrollGrid;

  get host(): Host {
    return this._host;
  }

  @Input()
  set host(value: Host) {
    this._host = value;
  }

  get hostLocations() {
    return this._hostLocations;
  }

  get selectedAssignment() {
    return this._selectedAssignment;
  }

  set selectedAssignment(status: string) {
    this._selectedAssignment = status;
    this._assignedStudents = [];
    (this.selectedAssignment === 'class') ? this.setLocationFilter() : this.setHostFilter();
  }

  @Input()
  set hostLocations(value) {
    this._hostLocations = value;

    if (this._hostLocations) { // Check if locations exists
      this.getActiveLocations();
    }
  }

  get selectedClassKey() {
    return this._selectedClassKey
  }

  set selectedClassKey(value: any) {
    this._selectedClassKey = value;
    this.selectedAssignment = 'class'; // Setting default value of the select as assigned students
    this._assignedStudents = [];
    this.setLocationFilter(); // By default when selecting a class, the students are filtered according to the selected class
  }

  private _host: Host;
  private _hostLocations: Location[];
  students: User[] = [];
  private selectedStudents: User[] = [];
  private _assignedStudents: User[] = [];
  private hostStudents: User[] = [];
  private updatedClassStudents: User[] = [];
  hostStudentForm: FormGroup;
  private _selectedClassKey: String;
  private _selectedAssignment: string = 'class';
  orderBy: OrderBy[];
  filterBy: FilterGroup[] = [];
  activeHostCount: number = 0;
  locationDropDownPlaceholder = "Select Location Name";

  constructor(private formBuilder: FormBuilder,
    private sideNavService: SidenavService,
    private notificationService: NotificationService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.hostStudentForm = this.formBuilder.group({
      items: new FormArray([])
    });

  }

  onSubmit(value: any) {
    value.items.forEach((item) => {
      // selectedStudents contains the selected students for the selected class
      // hostStudents contains the students of the selected host (used to identify the unassigned students for the selected class)
      (item.studentCheckBox) ? this.selectedStudents.push(item.user) : this.hostStudents.push(item.user);
    });
    this.updateClass();
  }

  updateClass() {
    this.notificationService.startLoadingIndicator();
    const organizationInfo = ObjectUtils.extractHostInfo(this.host);
    this.unassignStudentsFromClass(organizationInfo);
    this.assignClassToStudents(organizationInfo);

    if (this.updatedClassStudents.length > 0) {
      // Creating a new type to store execution status and the student being processed
      const execUpdates:Promise<any>[] = [];
      // Assigning and unassigning students based on the selection
      this.updatedClassStudents.forEach(student => {
        execUpdates.push(this.authService.updateFirestoreUser(student).toPromise());
      })

      Promise.all(execUpdates).then(value => {
        this.notificationService.showSuccessNotification("Successfully updated class assignments");
        this.back();
      }).catch(reason => {
        this.notificationService.showErrorNotification("Failed to update class assignments");
      })
    } else {
      // Will display notification if no assignments or unassignments were made
      this.notificationService.showInfoNotification("No changes are present to update");
    }
  }

  unassignStudentsFromClass(orgInfo: HostInfo) {
    this._assignedStudents.forEach(student => {
      if (this.hostStudents.some(user => user.email === student.email)) {
        // Creating a new location object to replace the current location info and avoid null data
        student.locationInfo = {
          id: '',
          hostId: orgInfo.id,
          hostName: orgInfo.name,
          name: '',
          description: ''
        }
        this.updatedClassStudents.push(student);
      }
    })
  }

  assignClassToStudents(orgInfo: HostInfo) {
    // Looping selected students array to create a map
    this.selectedStudents.forEach(user => {
      // Assigning current student in the loop to student object
      const student: User = user;
      if (student.organizationInfo.id === orgInfo.id &&
        (student.locationInfo == undefined || student.locationInfo.id !== this.selectedClassKey)) {
        student.organizationInfo = orgInfo;
        student.locationInfo = ObjectUtils.extractLocationInfo(this.host.locations[this.selectedClassKey]);
        this.updatedClassStudents.push(student);
      }
    });
  }


  getActiveLocations() {
    const activeLocations: Location[] = [];

    this._hostLocations.forEach(location => { // Check for existing active locations
      if (!location.isDisabled) {
        if (location.id) {
          activeLocations.push(location); // Create a array with active locations
          this.activeHostCount++; // Create an count of active locations to disable submit button
        }
      }
    });

    this._hostLocations = activeLocations; // Host locations = active locations

    if (this._hostLocations.length <= 0) {
      this.locationDropDownPlaceholder = "No Locations Available"; // Enhancement to display availability of active locations
    } else {
      this.selectedClassKey = this._hostLocations[0].id; // If no active locations available, selectedClassKey will be ignored
      this.setLocationFilter(); // Setting the filter to show students assigned to the 0th location
    }
  }

  setLocationFilter() {
    if (this.infiniteScroll) {
      // Clearing previously added filters
      this.infiniteScroll.clearAllFilters();
      this.filterBy = [];
    }
    // Adding filter to display only the students assigned for the selected class
    const locationFilter: FilterGroup = new FilterGroup("location-assignees");
    locationFilter.filters.push({
      fieldPath: "locationInfo.id",
      opStr: "==",
      value: this.selectedClassKey
    });
    this.filterBy.push(locationFilter);
  }

  setHostFilter() {
    if (this.host) {
      // Clearing previously added filters
      this.infiniteScroll.clearAllFilters();
      this.filterBy = [];
      // Adding filter to display only the students assigned for the selected host
      const hostFilter: FilterGroup = new FilterGroup("host-assignees");
      hostFilter.filters.push({
        fieldPath: "organizationInfo.id",
        opStr: "==",
        value: this.host.id
      });
      this.filterBy.push(hostFilter);
    }
  }

  assignedStudents(user: User) {
    this._assignedStudents.push(user);
  }

  back() {
    this.sideNavService.close();
  }
}
