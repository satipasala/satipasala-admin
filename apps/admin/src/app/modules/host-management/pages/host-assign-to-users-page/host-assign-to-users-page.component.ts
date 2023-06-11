import { Component, OnInit } from '@angular/core';
import { Host, HostsService, SidenavService, LoadingIndicatorService, NotificationService } from "@satipasala/base";
import { ActivatedRoute, Router } from "@angular/router";
import * as APP_ROUTES from "../../../../app-routs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'admin-host-assign-to-users-page',
  templateUrl: './host-assign-to-users-page.component.html',
  styleUrls: ['./host-assign-to-users-page.component.css']
})
export class HostAssignToUsersPageComponent implements OnInit {

  host: Host;
  hostLocations;

  constructor(
    private router: Router,
    private route: ActivatedRoute, private hostService: HostsService, private sideNavService: SidenavService,
    private notificationService: NotificationService) {
    /*This form receives edit, view, new*/
    this.route.params.subscribe(params => {
      this.hostService.get(params.hostId).subscribe(host => {
        this.host = host;
        this.hostLocations = Object.values(this.host.locations);
      }, err => {
        this.notificationService.showErrorNotification("Error retrieving users", err);
        setTimeout(() => {
          this.back();
        }, 1000)
      }
      )
    });
  }

  back() {
    this.sideNavService.close();
  }


  ngOnInit() {
  }

}
