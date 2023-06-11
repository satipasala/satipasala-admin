import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Filter, FilterGroup, OrderBy } from 'libs/base/src/lib/impl/FirebaseDataSource';
import { GlobalSearchService } from 'libs/base/src/lib/services/global-search.service';
import { Subscription } from 'rxjs';
import { AuthService, PermissionsService, SearchFilter, User } from '@satipasala/base';
import { SInfiniteScrollGrid } from 'libs/core/src/lib/infinite-scroll/infinite-scroll-grid/infinite-scroll-grid.component';

@Component({
  selector: 'admin-host-management-page',
  templateUrl: './host-management-page.component.html',
  styleUrls: ['./host-management-page.component.scss']
})
export class HostManagementPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(SInfiniteScrollGrid, { static: true })
  infiniteScroll: SInfiniteScrollGrid;

  searchFields: string[] = ['name', 'email', 'business_reg_no'];
  collection: string = 'hosts';
  orderBy: OrderBy[] = [];
  searchBy: SearchFilter[] = [];
  filterBy: FilterGroup[];
  searchSubscription: Subscription;
  rolePermission: Object;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private searchFilterService: GlobalSearchService,
    private authService: AuthService, private permissionsService: PermissionsService) {
    this.permissionsService.isRoleAuthorized('collection_hosts').then(permission => {
      this.rolePermission = permission
      this.permissionsService.getHostsFilters('view').then(filters => this.filterBy = filters).catch(err => console.error(err))
    }).catch(err => console.error(err));

  }

  ngOnInit() {
    this.searchSubscription = this.searchFilterService.connect(this.searchFields, filters => {
      this.searchBy = filters
    }, error => alert(error));
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  addNewHost() {
    this.router.navigate([{ outlets: { leftsidebar: ['new'] } }],
      { relativeTo: this.activatedRoute.parent });
  }

}
