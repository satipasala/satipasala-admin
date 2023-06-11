import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FilterGroup, OrderBy } from 'libs/base/src/lib/impl/FirebaseDataSource';
import { GlobalSearchService } from 'libs/base/src/lib/services/global-search.service';
import { Subscription } from 'rxjs';
import { PermissionsService, SearchFilter, NotificationService } from '@satipasala/base';
import { SInfiniteScrollGrid } from 'libs/core/src/lib/infinite-scroll/infinite-scroll-grid/infinite-scroll-grid.component';
import { ActivityFormDialog } from '../activity-form-dialog/activity-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'admin-activity-management-page',
  templateUrl: './activity-management-page.component.html',
  styleUrls: ['./activity-management-page.component.scss']
})
export class ActivityManagementPageComponent implements OnInit, OnDestroy {

  @ViewChild(SInfiniteScrollGrid, { static: true })
  infiniteScroll: SInfiniteScrollGrid;

  searchFields: string[] = ['name'];
  collection: string = 'activities';
  orderBy: OrderBy[] = [{ fieldPath: 'name', directionStr: 'asc' }];
  searchBy: SearchFilter[] = [];
  filterBy: FilterGroup[];
  searchSubscription: Subscription;
  rolePermission: Object;

  constructor(private searchFilterService: GlobalSearchService,
    private permissionsService: PermissionsService, public dialog: MatDialog, private notificationService: NotificationService) {
    this.permissionsService.isRoleAuthorized('collection_activities').then(permission => {
      this.rolePermission = permission;
    }).catch(err => console.error(err));
  }

  ngOnInit() {
    this.searchSubscription = this.searchFilterService.connect(this.searchFields, filters => {
      this.searchBy = filters
    }, error => alert(error));
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  addNewActivity() {
    const dialogRef = this.dialog.open(ActivityFormDialog, {
      width: '300px',
      data: { mode: 'add', activity: null }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.showSuccessNotification("Activity Creation");
      }
      if (result == false) {
        this.notificationService.showErrorNotification("Activity Creation");
      }
    });
  }
}
