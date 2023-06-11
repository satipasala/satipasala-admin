import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { Event, EventsService } from "@satipasala/base";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'event-status-change-dialog',
  templateUrl: './event-status-change-dialog.component.html',
  styleUrls: ['./event-status-change-dialog.component.scss']
})
export class EventStatusChangeDialog {

  selectedEvent: Event = null;
  stateToChange: boolean = false;

  stateToBeChanged: string; // For popup dialog 

  constructor(public dialogRef: MatDialogRef<EventStatusChangeDialog>, private eventsService: EventsService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedEvent = data.selectedEvent;
    this.stateToChange = data.selectedEventStatus;
  }

  onCancelChange(): void {
    this.dialogRef.close();
  }

  onEventStateChange() {
    this.selectedEvent.disabled = this.stateToChange;
    this.eventsService.update(this.selectedEvent.id, this.selectedEvent).then(() => {
      this.dialogRef.close(true)
    }).catch(err => {
      console.log(err);
      this.dialogRef.close(false);
    });
  }

  getStateToChange() {
    return (this.stateToChange ? this.stateToBeChanged = 'disable' : 'activate');
  }

}
