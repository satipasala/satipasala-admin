import {Component, Input, OnInit} from '@angular/core';
import {Host, HostsService, NotificationService, PermissionsService} from "@satipasala/base";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from '@angular/material/dialog';
import {HostStatusChangeDialog} from './host-status-change-dialog/host-status-change-dialog.component';

@Component({
  selector: 'admin-host-info-component',
  templateUrl: './host-info.component.html',
  styleUrls: ['./host-info.component.scss']
})
export class HostInfoComponent implements OnInit {
  get host(): Host {
    return this._host;
  }

  @Input()
  set host(value: Host) {
    this._host = value;
    this.permissionsService.isAuthorizedToEditHosts(this._host).then(isEditable => this.isEditable = isEditable);
  }

  private _host: Host;

  @Input()
  permission: any;

  isEditable: boolean = false


  constructor(private router: Router, private notificationService: NotificationService, private hostsService: HostsService,
              private activatedRoute: ActivatedRoute, public dialog: MatDialog, private permissionsService: PermissionsService) {

  }

  ngOnInit() {
  }

  edit(host: Host) {
    if(!host.disabled) {
      this.router.navigate([{outlets: {leftsidebar: [host.id]}}],
        {relativeTo: this.activatedRoute.parent, queryParams: {hostId: host.id, action: "edit"}});
    }
  }

  view(host: Host) {
    this.router.navigate([{outlets: {leftsidebar: [host.id]}}],
      {relativeTo: this.activatedRoute.parent, queryParams: {hostId: host.id, action: "view"}});
  }

  showLocations(host: Host) {
    this.router.navigate([{outlets: {leftsidebar: [host.id, 'location']}}],
      {relativeTo: this.activatedRoute.parent, queryParams: {hostId: host.id, action: "view"}});
  }

  addStudents(host: Host) {
    if(!host.disabled){
      this.router.navigate([{outlets: {leftsidebar: ["host", "assign", host.id]}}], {relativeTo: this.activatedRoute.parent});
    }
  }

  openDialog(host: Host, status: boolean): void {
    const dialogRef = this.dialog.open(HostStatusChangeDialog, {
      width: '350px',
      height: '25%',
      data: {selectedHost: host, selectedHostStatus: status}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.showSuccessNotification("Organization State Update");
      }
      if (result == false) {
        this.notificationService.showErrorNotification("Organization State Update");
      }
    });
  }


}
