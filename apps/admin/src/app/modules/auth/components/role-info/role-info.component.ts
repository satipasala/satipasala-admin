import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NotificationService, PermissionsService, RolesService, SearchFilter } from "@satipasala/base";
import { AUTH_MANAGEMENT_ROUTE_PERMISSIONS, } from "../../../../app-routs";
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FilterGroup } from 'libs/base/src/lib/impl/FirebaseDataSource';
import { Subscription } from 'rxjs';
import { GlobalSearchService } from 'libs/base/src/lib/services/global-search.service';
import { SInfiniteScrollGrid } from 'libs/core/src/lib/infinite-scroll/infinite-scroll-grid/infinite-scroll-grid.component';

@Component({
  selector: 'admin-role-info',
  templateUrl: './role-info.component.html',
  styleUrls: ['./role-info.component.scss']
})
export class RoleInfoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(SInfiniteScrollGrid, { static: true }) infiniteScroll: SInfiniteScrollGrid;

  searchFields: string[] = ['name'];
  collection: string = 'roles';
  //orderBy: OrderBy[] = [{ fieldPath: 'name', directionStr: 'asc' }];
  searchBy: SearchFilter[] = [];
  filterBy: FilterGroup[] = [];
  searchSubscription: Subscription;
  rolePermission: Object;


  constructor(private rolesService: RolesService, private router: Router, private activatedRoute: ActivatedRoute,
    private searchFilterService: GlobalSearchService,
    private permissionsService: PermissionsService, private notificationService: NotificationService) {
    this.permissionsService.isRoleAuthorized('collection_roles').then(permission => {
      this.rolePermission = permission;
      this.permissionsService.getRolesFilters().then(filterGroups => {
        this.filterBy = filterGroups;
      }).catch(reason => {
        this.notificationService.showErrorNotification("Cannot retrieve role filters.");
      })
    }).catch(err => console.error(err));
  }

  ngOnInit() {
    this.searchSubscription = this.searchFilterService.connect(this.searchFields,
      filters => this.searchBy = filters, error => alert(error));
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }


  addNewRole() {
    this.router.navigate([{ outlets: { leftsidebar: [AUTH_MANAGEMENT_ROUTE_PERMISSIONS, "new"] } }],
      { relativeTo: this.activatedRoute.parent });
  }
}
