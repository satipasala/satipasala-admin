import { Component, Input, OnInit } from '@angular/core';
import { NotificationService, PermissionsService, Activity } from "@satipasala/base";
import { MatDialog } from '@angular/material/dialog';
import { ActivityStatusChangeDialog } from './activity-status-change-dialog/activity-status-change-dialog.component';
import { ActivityFormDialog } from '../activity-form-dialog/activity-form-dialog.component';

@Component({
  selector: 'admin-activity-info-component',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.scss']
})
export class ActivityInfoComponent implements OnInit {
  get activity(): Activity {
    return this._activity;
  }
  @Input()
  set activity(value: Activity) {
    this._activity = value;
  }

  private _activity: Activity;

  rolePermission: Object;
  hostCollectionEdit: boolean;

  constructor(private notificationService: NotificationService, public dialog: MatDialog, private permissionsService: PermissionsService) {
    this.permissionsService.isRoleAuthorized('collection_activities').then(permission => this.rolePermission = permission).catch(err => console.error(err));
  }

  ngOnInit() {
  }

  edit(activity: Activity) {
    this.openFormDialog('edit', activity);
  }

  view(activity: Activity) {
    this.openFormDialog('view', activity)
  }

  openDialog(activity: Activity, status: string): void {
    const dialogRef = this.dialog.open(ActivityStatusChangeDialog, {
      width: '350px',
      height: '25%',
      data: { selectedActivity: activity, selectedActivityStatus: status }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.showSuccessNotification("Activity State Update");
      }
      if (result == false) {
        this.notificationService.showErrorNotification("Activity State Update");
      }
    });
  }


  openFormDialog(mode: 'edit' | 'view', activity: any): void {
    const dialogRef = this.dialog.open(ActivityFormDialog, {
      width: '500px',
      data: { mode: mode, activity: activity }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.showSuccessNotification("Activity Update");
      }
      if (result == false) {
        this.notificationService.showErrorNotification("Activity Update");
      }
    });
  }

}
