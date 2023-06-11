import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  Event,
  GlobalSearchService,
  NotificationService,
  OrderBy,
  PermissionsService,
  SearchFilter,
  StorageService
} from "@satipasala/base";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from '@angular/material/dialog';
import {EventSessionService} from "../../../../../../../../libs/base/src/lib/services/event-session.service";
import {FilterGroup} from "../../../../../../../../libs/base/src/lib/impl/FirebaseDataSource";
import {EventSession} from "../../../../../../../../libs/base/src/lib/model/EventSession";


@Component({
  selector: 'admin-event-session',
  templateUrl: './event-session.component.html',
  styleUrls: ['./event-session.component.scss']
})
export class EventSessionComponent implements OnInit, OnDestroy {

  satiEvent: Event;
  eventSession: EventSession;
  imageUrl: Observable<string>;
  eventSessionSearchBy: SearchFilter[] = [{field: 'eventId', value: ''}];
  eventSessionOrderBy: OrderBy[] = [{fieldPath: 'startDate', directionStr: 'desc'}];
  eventSessionFilterBy: FilterGroup[] = [];
  eventSessionSearchFields: string[] = ['name'];
  eventSessionSearchSubscription: Subscription;
  eventId: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private storeService: StorageService,
              public permissionsService: PermissionsService,
              public dialog: MatDialog,
              private notificationService: NotificationService,
              private sessionService: EventSessionService,
              private searchFilterService: GlobalSearchService) {
  }

  ngOnInit() {

    this.eventSessionSearchSubscription = this.searchFilterService.connect(this.eventSessionSearchFields,
      filters => {
        this.eventSessionSearchBy = [...filters, {field: 'eventId', value: this.eventId}]
      }, error => alert(error)
    )
    ;
    this.route.queryParams.subscribe(queryParams => {
      if(queryParams.eventId && this.eventId != queryParams.eventId){

        this.eventId = queryParams.eventId;
        this.eventSessionSearchBy = [{field: 'eventId', value: this.eventId}];
      }
    });
  }

  ngOnDestroy(): void {
    this.eventSessionSearchSubscription.unsubscribe();
  }


  @Input()
  permission: any;

  @Input()
  set event(event: Event) {
    this.satiEvent = event;
    this.imageUrl = this.storeService.getFileDownloadPath(event.imgUrls[0], "assets/images/location.jpg");
  }

  get event(): Event {
    return this.satiEvent;
  }

}
