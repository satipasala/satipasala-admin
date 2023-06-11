import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HOST_LOCATIONS_INFO_ROUTE} from "../../../../app-routs";
import {Host} from "@satipasala/base";

@Component({
  selector: 'admin-host-sub-menu',
  templateUrl: './host-sub-menu.component.html',
  styleUrls: ['./host-sub-menu.component.scss']
})
export class HostSubMenuComponent implements OnInit {

  @Input() host:Host;
locationsRoute:string = HOST_LOCATIONS_INFO_ROUTE;
  constructor(private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  edit() {
    this.router.navigate([{outlets: {leftsidebar: [this.host.id]}}],
      {relativeTo: this.activatedRoute.parent});
  }

  showLocations(){
    this.router.navigate([{outlets: {leftsidebar: [this.host.id,'location']}}],
      {relativeTo: this.activatedRoute.parent});
  }

  addStudents() {
    this.router.navigate( [{outlets: {leftsidebar: ["host","assign",this.host.id ]}}],{relativeTo: this.activatedRoute.parent});
    console.log('button works');
  }
}
