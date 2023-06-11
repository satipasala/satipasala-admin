import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  Host,
  HostsService, NotificationService, OrderBy,
  PermissionsService,
  ReferenceDataService,
  Role,
  RolesService,
  User,
  UsersService
} from "@satipasala/base";
import {Observable} from "rxjs";
import {Filter, FilterGroup} from "../../../../../../../../libs/base/src/lib/impl/FirebaseDataSource";
import * as APP_ROUTES from "../../../../app-routs";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'admin-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit, AfterViewInit {
  get filterGroups(): FilterGroup[] {
    return this._filterGroups;
  }

  set filterGroups(value: FilterGroup[]) {
    this._filterGroups = value;
    this.applyFilters.emit(this._filterGroups);
  }

  roles: Observable<Role[]>;
  status = ['Active', 'Inactive'];
  organizations: Observable<Host[]>;

  //Variables for the search component
  collection: string = 'users';

  private _filterGroups: FilterGroup[];

  selectedStatus: any;
  selectedRole: any;
  selectedOrg: any;

  formGroup :FormGroup;

  defaultHostSearchFields: string[] = ['name'];
  hostOrderBy: OrderBy[] = [{fieldPath: 'name', directionStr: 'asc'}];
  hostFilterBy: FilterGroup[];

  @Output()
  applyFilters: EventEmitter<FilterGroup[]> = new EventEmitter<FilterGroup[]>();


  constructor(private fb:FormBuilder,private usersService: UsersService, private rolesService: RolesService, private referenceDataService: ReferenceDataService,
              private router: Router, private hostService: HostsService, private permissionService: PermissionsService, private notificationService: NotificationService) {
    this.setFilters();
    this.formGroup = this.fb.group({
      'organizationInfo': ['']
    });

    this.permissionService.getHostsFilters('view').then(filters => {
      this.hostFilterBy = filters;
    });

  }


  setFilters() {
    let filters: Filter[] = [];
    this.addStatusFilter(filters);
    this.addOrgFilter(filters);
    this.addRoleFilter(filters)

    this.permissionService.getUsersFilters('view').then(filterGroups => {
      filterGroups.forEach(filterGroup => {
        filterGroup.filters.push(...filters);
      });
      this.filterGroups = filterGroups;
    }).catch(reason => {
      let filterGroup = new FilterGroup("default", filters);
      this.filterGroups = [filterGroup];
      this.notificationService.showErrorNotification("Error retrieving user filters", reason)
    })
  }


  ngOnInit() {
    this.roles = this.rolesService.getAll();
    console.log("user roles size" + this.roles);
  }

  ngAfterViewInit(): void {

  }

  backToUserCreate() {
    this.router.navigateByUrl(APP_ROUTES.USERS_REGISTER_ROUTE);
  }

  resetFilters() {
    this.selectedStatus = null;
    this.selectedRole = null;
    this.selectedOrg = null;
  }

  clearFilterFields() {
    this.resetFilters();
    this.setFilters();
    this.formGroup.reset();
  }

  addStatusFilter(filters: Filter[]): Filter[] {
    const f: Filter = new Filter();
    f.fieldPath = "disabled";
    f.opStr = "==";
    switch (this.selectedStatus) {
      case 'Active':
        f.value = false;
        filters.push(f)
        break;
      case 'Inactive':
        f.value = true;
        filters.push(f);
        break;

    }

    return filters;
  }

  addOrgFilter(filters: Filter[]): Filter[] {
    if (this.selectedOrg && this.selectedOrg != 'All') {
      let filter: Filter = new Filter()
      filter.fieldPath = "organizationInfo.id";
      filter.opStr = "==";
      filter.value = this.selectedOrg.id;
      filters.push(filter)
    }
    return filters;
  }

  addRoleFilter(filters: Filter[]): Filter[] {
    if (this.selectedRole && this.selectedRole != 'All') {
      const f: Filter = new Filter();
      f.fieldPath = "userRole.id";
      f.opStr = "==";
      f.value = this.selectedRole;
      filters.push(f)
    }

    return filters;

  }

  filterByStatus(value) {
    this.selectedStatus = value;
    this.setFilters();
  }

  filterByOrg(value: Host) {
    this.selectedOrg = value;
    this.setFilters();
  }

  filterByRole(value) {
    this.selectedRole = value
    this.setFilters();
  }
}



