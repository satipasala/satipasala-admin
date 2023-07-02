import {Component, Input, OnInit} from '@angular/core';
import {Event as satiEvent, Event, NotificationService, PermissionsService, StorageService, ObjectUtils} from "@satipasala/base";
import {Observable} from "rxjs";
import {
  EVENT_MANAGEMENT_EDIT_ROUTE,
  EVENT_MANAGEMENT_VIEW_ROUTE,
  SESSION_MANAGEMENT_ADD_ROUTE,
  SESSION_MANAGEMENT_ROUTE
} from "../../../../app-routs";
import {ActivatedRoute, Router} from "@angular/router";
import {EventStatusChangeDialog} from './event-status-change-dialog/event-status-change-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {faChild, faFemale, faMale} from '@fortawesome/free-solid-svg-icons';
import {EventDeleteConfimationDialog} from "./event-delete-confirmation-dialog/event-delete-confirmation-dialog.component";

@Component({
  selector: 'admin-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  male = faMale;
  female = faFemale;
  child = faChild;
  satiEvent: Event;
  imageUrl: Observable<string>;
  isAuthorizedToEdit: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private storeService: StorageService, public permissionsService: PermissionsService,
              public dialog: MatDialog, private notificationService: NotificationService) {

    this.isAuthorizedToEditUser()
  }

  isAuthorizedToEditUser() {
    this.permissionsService.isAuthorizedToEditEvent('edit').then(value => {
      this.isAuthorizedToEdit = value;
    }).catch(reason => {
      this.isAuthorizedToEdit = false;
    });
  }

  ngOnInit() {
  }

  @Input()
  permission: any;

  @Input()
  set event(event: Event) {
    this.satiEvent = event;
    this.satiEvent.startDate = ObjectUtils.convertFirebaseTimestamp(this.satiEvent.startDate);
    this.satiEvent.endDate = ObjectUtils.convertFirebaseTimestamp(this.satiEvent.endDate);
    
    // this.imageUrl = this.storeService.getFileDownloadPath(event.imgUrls[0], "assets/images/location.jpg");
    this.imageUrl = this.storeService.getDefaultMediaPath(event.mediaFiles, "assets/images/location.jpg");
  }

  get event(): Event {
    return this.satiEvent;
  }

  editEvent(event: satiEvent) {
    this.router.navigate([{
        outlets: {leftsidebar: [EVENT_MANAGEMENT_EDIT_ROUTE]}
      }],
      {relativeTo: this.activatedRoute.parent, queryParams: {eventId: event.id, action: "edit"}});
  }

  viewEvent(event: satiEvent) {
    this.router.navigate([{
        outlets: {leftsidebar: [EVENT_MANAGEMENT_VIEW_ROUTE]}
      }],
      {relativeTo: this.activatedRoute.parent, queryParams: {eventId: event.id, action: "view"}});
  }

  viewSessions(satiEvent: Event) {
    this.router.navigate([{
        outlets: {leftsidebar: [SESSION_MANAGEMENT_ROUTE]}
      }],
      {relativeTo: this.activatedRoute.parent, queryParams: {eventId: satiEvent.id, action: "view"}});
  }

  addSessions(satiEvent: Event) {
    this.router.navigate([{
      outlets: {leftsidebar: [SESSION_MANAGEMENT_ADD_ROUTE]}
    }], {relativeTo: this.activatedRoute.parent, queryParams: {eventId: satiEvent.id, action: "add"}});
  }

  openDialog(event: Event, status: boolean): void {
    const dialogRef = this.dialog.open(EventStatusChangeDialog, {
      width: '350px',
      height: '25%',
      data: {selectedEvent: event, selectedEventStatus: status}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.showSuccessNotification("Event State Update");
      }
      if (result == false) {
        this.notificationService.showErrorNotification("Event State Update");
      }
    });
  }

  openDeleteDialog(event: Event): void {
    const dialogRef = this.dialog.open(EventDeleteConfimationDialog, {
      width: '350px',
      height: '25%',
      data: {selectedEvent: event}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.showSuccessNotification("Event State Update");
      }
      if (result == false) {
        this.notificationService.showErrorNotification("Event State Update");
      }
    });
  }

  getEventName() {
    return this.satiEvent.program ? this.satiEvent.program.name : this.satiEvent['course'].name
  }

}
