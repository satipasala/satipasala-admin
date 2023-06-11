import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'admin-dashboard-card-component',
  templateUrl: './dashboard-card-component.component.html',
  styleUrls: ['./dashboard-card-component.component.scss']
})
export class DashboardCardComponentComponent implements OnInit {

  @Input()
  image: string;

  @Input()
  title: string;

  @Input()
  stat: number;

  @Input()
  actionIcon1: string;

  @Output()
  clickAction1Emitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  clickAction1() {
    this.clickAction1Emitter.emit(true);
  }
}
