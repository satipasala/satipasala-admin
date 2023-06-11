import {Component, OnInit} from '@angular/core';
import {Host, HostsService, NotificationService} from '@satipasala/base';
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'admin-location-info-list',
  templateUrl: './location-info-list.component.html',
  styleUrls: ['./location-info-list.component.css']
})
export class LocationInfoListComponent implements OnInit {

  host : Host;
  locationArray:any;

  constructor(private route: ActivatedRoute, private hostsService: HostsService,private notificationService:NotificationService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.hostsService.get(queryParams.hostId).subscribe(savedHost => {
        this.host = savedHost;
        this.locationArray = Object.values(savedHost.locations);
      }, error => {
        this.notificationService.showErrorNotification("Error retrieving host. Redirecting...", error);
      }
    );
  });
  }


}
