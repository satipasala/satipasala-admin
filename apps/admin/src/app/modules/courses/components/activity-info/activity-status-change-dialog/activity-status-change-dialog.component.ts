import { Component, Inject } from "@angular/core";
import { Activity, ActivitiesService } from "@satipasala/base";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'activity-status-change-dialog',
  templateUrl: './activity-status-change-dialog.html',
  styleUrls: ['./activity-status-change-dialog.component.scss']
})
export class ActivityStatusChangeDialog {

  activity: Activity = null;
  activityStateToBeChange: string;

  stateToBeChanged: string; // For popup dialog 

  constructor(public dialogRef: MatDialogRef<ActivityStatusChangeDialog>, private activitiesService: ActivitiesService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.activity = data.selectedActivity;
    this.activityStateToBeChange = data.selectedActivityStatus;
  }

  cancelUpdate(): void {
    this.dialogRef.close();
  }

  confirmActivityStateChange() {
    this.activity.active = this.activityStateToBeChange;
    this.activitiesService.update(this.activity.id, this.activity).then(() => {
      this.dialogRef.close(true)
    }).catch(err => {
      console.log(err);
      this.dialogRef.close(false);
    });
  }

  getActivityStatusToBeChanged() {
    return (this.activityStateToBeChange === 'No' ? this.stateToBeChanged = 'disable' : 'activate');
  }

}
