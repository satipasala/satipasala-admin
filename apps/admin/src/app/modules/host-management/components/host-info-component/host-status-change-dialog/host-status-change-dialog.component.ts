import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { Host, HostsService } from "@satipasala/base";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'host-status-change-dialog',
  templateUrl: './host-status-change-dialog.html',
  styleUrls: ['./host-status-change-dialog.component.scss']
})
export class HostStatusChangeDialog {

  selectedHost: Host = null;
  selectedHostStateToBeChanged: boolean = false;

  stateToBeChanged : string; // For popup dialog 
  
  constructor(private cdRef: ChangeDetectorRef, public dialogRef: MatDialogRef<HostStatusChangeDialog>, private hostsService: HostsService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedHost = data.selectedHost;
    this.selectedHostStateToBeChanged = data.selectedHostStatus;
  }

  cancelUpdate(): void {
    this.dialogRef.close();
  }

  confirmHostStateChange() {
    this.selectedHost.disabled = this.selectedHostStateToBeChanged;
    this.hostsService.update(this.selectedHost.id, this.selectedHost).then(() => {
      this.dialogRef.close(true)
    }).catch(err => {
      console.log(err);
      this.dialogRef.close(false);
    });
  }

  getHostStatusToBeChanged(){
    return (this.selectedHostStateToBeChanged ? this.stateToBeChanged = 'disable' : 'activate');
  }

}
