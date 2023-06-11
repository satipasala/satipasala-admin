import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HOST_MANAGEMENT_ROUTE} from "../../../../app-routs";
import {Location} from "@satipasala/base";

@Component({
  selector: 'admin-location-sub-menu',
  templateUrl: './location-sub-menu.component.html',
  styleUrls: ['./location-sub-menu.component.scss']
})
export class LocationSubMenuComponent implements OnInit {

  @Input() location: Location;
  @Input() hostId: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  edit() {
    this.router.navigate([HOST_MANAGEMENT_ROUTE + "/" + this.hostId + "/location/"+this.location]);
  }
}
