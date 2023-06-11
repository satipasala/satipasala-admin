import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { USERS_REGISTER_ROUTE } from "../../../../app-routs";
import { ActivatedRoute, Router } from "@angular/router";
import { SInfiniteScrollGrid } from "@satipasala/core";
import { GlobalSearchService, PermissionsService, User } from "@satipasala/base";
import { AuthService, SearchFilter, NotificationService } from "@satipasala/base";
import { Observable, Subscription } from "rxjs";
import { Filter, OrderBy } from "@satipasala/base";
import { FilterGroup } from "../../../../../../../../libs/base/src/lib/impl/FirebaseDataSource";

@Component({
  selector: 'admin-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, OnDestroy {


  @ViewChild(SInfiniteScrollGrid, { static: true })
  infiniteScroll: SInfiniteScrollGrid;

  collection: string = 'users';
  orderBy: OrderBy[] = [{ fieldPath: 'email', directionStr: 'asc' }];
  searchBy: SearchFilter[] = [];
  filterBy: FilterGroup[];
  currentUser: User;
  searchSubscription: Subscription;
  rolePermission: Object;

  searchFields: string[] = ['displayName', 'lastName', 'firstName', 'email'];

  constructor(authService: AuthService, private permissionService: PermissionsService, private router: Router, private activatedRoute: ActivatedRoute,
    private searchFilterService: GlobalSearchService, private notificationService: NotificationService) {
    authService.getCurrentDbUser().subscribe(value => {
      this.currentUser = value;
    }, error => console.error(error));

    this.permissionService.isRoleAuthorized('collection_users').then(permission => {
      this.rolePermission = permission;
      this.permissionService.getUsersFilters('view').then(filters => {
        this.filterBy = filters
      }).catch(reason => console.error(reason));  
    })
  }

  resetFilterFields(event) {
    this.infiniteScroll.clearAllFilters();
  }

  ngOnInit() {
    this.searchSubscription = this.searchFilterService.connect(this.searchFields, filters => {
      this.searchBy = filters
    }, error => alert(error));
  }


  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }


  /**
   * Only system admin role can create new users. Cloud function does not allow user registration by a user who doesn't have 'collections_roles_write' privilege
   * TODO: Revise firebase rules and permission in order to prevent unauthorized user/role update
   * @returns {Observable<boolean>}
   */
  addNewUser() {
    if (this.rolePermission['edit']) {
      this.router.navigate([{ outlets: { leftsidebar: [USERS_REGISTER_ROUTE] } }], { relativeTo: this.activatedRoute.parent }); // Allow user registration
    } else {
      this.notificationService.showErrorNotification("Insufficient permission to create user", "Does not have adequate permission");
    }
  }


  setFilterBy(filters: FilterGroup[]) {
    this.filterBy = filters;
  }
}

