import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { Event, EventsService } from "@satipasala/base";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'event-delete-confirmation-dialog',
  templateUrl: './event-delete-confirmation-dialog.component.html',
  styleUrls: ['./event-delete-confirmation-dialog.component.scss']
})
export class EventDeleteConfimationDialog {

  selectedEvent: Event = null;
  stateToChange: boolean = false;

  stateToBeChanged: string; // For popup dialog

  constructor(public dialogRef: MatDialogRef<EventDeleteConfimationDialog>, private eventsService: EventsService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedEvent = data.selectedEvent;
  }

  onCancelChange(): void {
    this.dialogRef.close();
  }

  onEventDelete() {
    this.selectedEvent.disabled = this.stateToChange;
    this.eventsService.delete(this.selectedEvent.id).then(() => {
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
