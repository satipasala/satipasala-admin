import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FilterGroup, OrderBy } from 'libs/base/src/lib/impl/FirebaseDataSource';
import { PermissionsService, SearchFilter } from '@satipasala/base';
import { Subscription } from 'rxjs';
import { GlobalSearchService } from 'libs/base/src/lib/services/global-search.service';
import { SInfiniteScrollGrid } from 'libs/core/src/lib/infinite-scroll/infinite-scroll-grid/infinite-scroll-grid.component';

@Component({
  selector: 'admin-cources-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(SInfiniteScrollGrid, { static: true }) infiniteScroll: SInfiniteScrollGrid;

  searchFields: string[] = ['name', 'status'];
  collection: string = 'courses';
  orderBy: OrderBy[] = [{ fieldPath: 'name', directionStr: 'asc' }];
  searchBy: SearchFilter[] = [];
  filterBy: FilterGroup[];
  searchSubscription: Subscription;
  rolePermission: Object;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private searchFilterService: GlobalSearchService, private permissionsService: PermissionsService) {
    this.permissionsService.isRoleAuthorized('collection_courses').then(permission => {
      this.rolePermission = permission;
      this.permissionsService.getCourseFilters('view').then(filters => {
        this.filterBy = filters;
        }).catch(err => console.error('Unable to fetch course filters. Error => %s', err))
    }).catch(err => console.error(err));
  }

  ngOnInit() {
    this.searchSubscription = this.searchFilterService.connect(this.searchFields, filters => this.searchBy = filters, error => alert(error));
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }


  addNewCourse() {
    this.router.navigate([{ outlets: { leftsidebar: ["new", "add"] } }], { relativeTo: this.activatedRoute.parent });
  }

}

