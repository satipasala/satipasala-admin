import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'admin-location-info-card',
  templateUrl: './location-info-card.component.html',
  styleUrls: ['./location-info-card.component.scss']
})
export class LocationInfoCardComponent implements OnInit {

  @Input()
  location: any;

  constructor() {
  }

  ngOnInit() {
  }

}
