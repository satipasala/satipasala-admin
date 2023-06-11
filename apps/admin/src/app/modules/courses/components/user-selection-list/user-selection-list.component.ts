import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  AuthService,
  Course,
  CourseSubscriptionService,
  GlobalSearchService,
  NotificationService,
  OrderBy,
  PermissionsService,
  SearchFilter,
  SidenavService,
  User,
  UsersService
} from "@satipasala/base";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {FilterGroup} from "../../../../../../../../libs/base/src/lib/impl/FirebaseDataSource";
import {Program} from "../../../../../../../../libs/base/src/lib/model/Course";
import {Subscription} from "rxjs";

@Component({
  selector: 'admin-user-selection-list',
  templateUrl: './user-selection-list.component.html',
  styleUrls: ['./user-selection-list.component.scss']
})
export class UserSelectionListComponent implements OnInit, OnDestroy {

  @Input() course: Course;
  @Input() program: Program;

  collection: string = 'users';
  orderBy: OrderBy[] = [{fieldPath: 'userRole.roleLevel.access_level', directionStr: 'asc'}];
  searchBy: SearchFilter[] = [];
  searchFields: string[] = ['displayName', 'lastName', 'firstName', 'email'];
  filterBy: FilterGroup[];
  loggedUser: User;
  searchSubscription: Subscription;
  updatedUsers: Map<String, any> = new Map<String, any>();

  constructor(private formBuilder: FormBuilder,
              private sideNavService: SidenavService,
              private notificationService: NotificationService,
              private permissionService: PermissionsService,
              private searchFilterService: GlobalSearchService,
              private courseSubscriptionService: CourseSubscriptionService, private authService: AuthService, private userService: UsersService) {

    this.permissionService.getUsersFilters('edit').then(filters => this.filterBy = filters).catch(reason => console.log(reason));
    this.authService.getCurrentDbUser().subscribe(value => this.loggedUser = value, error => console.error(error));
  }

  ngOnInit() {


    this.searchSubscription = this.searchFilterService.connect(this.searchFields,
      filters => {
        this.searchBy = filters
      }, error => alert(error)
    )
  }

  updateCourseSubscriptions(map: Map<String,any>) {
    let updatePromises: Promise<any>[] = [];
    map.forEach((item) => {
      if (!item.user.courseSubscriptions) {
        item.user.courseSubscriptions = {};
      }
      let isDirty = false;
      if (item.studentCheckBox === true) {
        if (null == item.user.courseSubscriptions?.[this.course.id]) {
          let courseCopy = Object.assign({}, this.course);
          item.user.courseSubscriptions[this.course.id] = courseCopy;
          isDirty = true;
        }
        if (item.user.courseSubscriptions[this.course.id].mandatory !== item.studentCourseMandatory) {
          item.user.courseSubscriptions[this.course.id].mandatory = item.studentCourseMandatory;
          isDirty = true;
        }

      } else if (item.studentCheckBox === false && (null != item.user.courseSubscriptions?.[this.course.id])) {
        delete item.user.courseSubscriptions[this.course.id];
        isDirty = true;
      }
      if (isDirty) {
        updatePromises.push(this.userService.update(item.user.id, item.user));
      }
    });

    Promise.all(updatePromises).then(() => {
      console.log("Course assigned!");
      this.notificationService.showSuccessNotification("Course assigned!");
      this.back();
    }).catch(error => {
      this.notificationService.showErrorNotification("Course assigned error : " + error);
      console.error("Assigning course failed. Error => " + error)
      this.back();
    })
  }

  updateProgramSubscriptions(map: Map<String,any>) {
    let updatePromises: Promise<any>[] = [];
    map.forEach((item) => {
      if (!item.user.programSubscriptions) {
        item.user.programSubscriptions = {};
      }
      let isDirty = false;
      if (item.studentCheckBox === true) {
        if (null == item.user.programSubscriptions?.[this.program.id]) {
          let programCopy = Object.assign({}, this.program);
          item.user.programSubscriptions[this.program.id] = programCopy;
          isDirty = true;
        }
        if (item.user.programSubscriptions[this.program.id].mandatory !== item.studentCourseMandatory) {
          item.user.programSubscriptions[this.program.id].mandatory = item.studentCourseMandatory;
          isDirty = true;
        }

      } else if (item.studentCheckBox === false && (null != item.user.programSubscriptions?.[this.program.id])) {
        delete item.user.programSubscriptions[this.program.id];
        isDirty = true;
      }
      if (isDirty) {
        updatePromises.push(this.userService.update(item.user.id, item.user));
      }
    });

    Promise.all(updatePromises).then(() => {
      console.log("Program assigned!");
      this.notificationService.showSuccessNotification("Program assigned!");
      this.back();
    }).catch(error => {
      this.notificationService.showErrorNotification("Program assigned error : " + error);
      console.error("Assigning Program  failed. Error => " + error)
      this.back();
    })
  }


  onSubmit() {
    this.notificationService.startLoadingIndicator();
    if (this.course != null) {
      this.updateCourseSubscriptions(this.updatedUsers)
    }
    if (this.program != null) {
      this.updateProgramSubscriptions(this.updatedUsers)
    }
  }

  back() {
    this.sideNavService.close();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  addUserUpdates(item) {
    this.updatedUsers.set(item.user.email, item)
  }
}
