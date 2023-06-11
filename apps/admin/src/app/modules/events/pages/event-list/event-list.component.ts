import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { EVENT_MANAGEMENT_ADD_ROUTE } from "../../../../app-routs";
import { FilterGroup, OrderBy } from 'libs/base/src/lib/impl/FirebaseDataSource';
import { PermissionsService, SearchFilter } from '@satipasala/base';
import { Subscription } from 'rxjs';
import { GlobalSearchService } from 'libs/base/src/lib/services/global-search.service';
import { SInfiniteScrollGrid } from 'libs/core/src/lib/infinite-scroll/infinite-scroll-grid/infinite-scroll-grid.component';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(SInfiniteScrollGrid, { static: true }) infiniteScroll: SInfiniteScrollGrid;

  searchFields: string[] = ['name', 'title','addressInfo.country.name','host.name','program.name'];
  collection: string = 'events';
  orderBy: OrderBy[] = [{ fieldPath: 'startDate', directionStr: 'desc' }];
  searchBy: SearchFilter[] = [];
  filterBy: FilterGroup[];
  searchSubscription: Subscription;
  rolePermission: Object;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private searchFilterService: GlobalSearchService, private permissionService: PermissionsService) {
    this.permissionService.isRoleAuthorized('collection_events').then(permission => this.rolePermission = permission)
  }

  ngOnInit() {
    this.searchSubscription = this.searchFilterService.connect(this.searchFields, filters => this.searchBy = filters, error => alert(error));
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }


  addNew() {
    this.router.navigate([{
      outlets:
        { leftsidebar: [EVENT_MANAGEMENT_ADD_ROUTE] }
    }],
      { relativeTo: this.activatedRoute.parent });
  }


}
