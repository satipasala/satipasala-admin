import {Component, OnInit} from '@angular/core';
import {EventFilterSession} from "../../events/event-filter/event-filter.component";

@Component({
  selector: 'admin-event-overview',
  templateUrl: './event-overview-page.component.html',
  styleUrls: ['./event-overview-page.component.scss']
})
export class EventOverviewPageComponent implements OnInit {

  filterSession: EventFilterSession;

  constructor() {
  }

  ngOnInit() {

  }

  onFilterSessionChange(filterSession: EventFilterSession) {
    this.filterSession = filterSession
  }

}
