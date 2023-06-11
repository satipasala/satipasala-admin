import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {
  EventSession,
  SESSION_COMPLETED, SESSION_NOT_STARTED,
  SESSION_STARTED
} from "../../../../../../../../libs/base/src/lib/model/EventSession";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService, StorageService} from "@satipasala/base";
import {EventSessionService} from "../../../../../../../../libs/base/src/lib/services/event-session.service";
import {formatDate} from '@angular/common';
import {
  SESSION_MANAGEMENT_EDIT_ROUTE,
} from "../../../../app-routs";

@Component({
  selector: 'admin-event-session-card',
  templateUrl: './event-session-card.component.html',
  styleUrls: ['./event-session-card.component.scss']
})
export class EventSessionCardComponent implements OnInit {

  @Input()
  session: EventSession;
  imageUrl: Observable<string>;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private eventSessionService: EventSessionService ) {

  }

  ngOnInit(): void {

  }

  editSession(session: EventSession) {
   /* this.router.navigateByUrl('events/(eventInfo//leftsidebar:editSession)?sessionId='+session.id+'&action=edit').then(value => {
      console.log(value)
    }).catch(reason => {
      console.error(reason)
    });*/
    this.router.navigate([{
      outlets: {leftsidebar2: [SESSION_MANAGEMENT_EDIT_ROUTE]}
    }], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {sessionId: session.id, action: "edit"}
    }).then(value => {
      console.log(value)
    }).catch(reason => {
      console.error(reason)
    });
  }


  viewSession(session: EventSession) {
    this.router.navigate([{
      outlets:
        {leftsidebar: ['addSession', session.eventId]}
    }], {relativeTo: this.activatedRoute.parent, queryParams: {eventId: session.eventId, action: "view"}});
  }

  startSession() {
    this.notificationService.startLoadingIndicator();
    this.session.status = SESSION_STARTED;
    this.eventSessionService.update(this.session.id, this.session).then(() => {
      this.notificationService.showSuccessNotification("Session started successfully");
    }).catch(err => {
      this.session.status = SESSION_NOT_STARTED;
      this.notificationService.showErrorNotification("Session start failed", err);
    });
  }

  completeSession() {
    this.notificationService.startLoadingIndicator();
    this.session.status = SESSION_COMPLETED;
    this.eventSessionService.update(this.session.id, this.session).then(() => {
      this.notificationService.showSuccessNotification("Session completed successfully");
    }).catch(err => {
      this.session.status = SESSION_STARTED;
      this.notificationService.showErrorNotification("Session complete failed", err);
    });
  }

  isOverDue(){
    let date = formatDate( this.session.startDate, 'yyyy-MM-dd', 'en-US');
    return !(this.session.status.value == 'not_started') && formatDate(new Date(), 'yyyy-MM-dd', 'en-US') === this.session.startDate;
  }

  getFacilitatorCount(){
    return this.session&& this.session.facilitators?Object.keys(this.session.facilitators).length:0;
  }

  getParticipantCount(){
    return this.session && this.session.participation ?Object.keys(this.session.participation).length:0;
  }

  getProgramsNames(){
    return Object.values(this.session.program.courses).filter(value => value.active == 'Yes')
  }

}
