import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PermissionsService, Role} from "@satipasala/base";
import {AUTH_MANAGEMENT_ROUTE_COURSES, AUTH_MANAGEMENT_ROUTE_PERMISSIONS} from "../../../../app-routs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'admin-role-card',
  templateUrl: './role-card.component.html',
  styleUrls: ['./role-card.component.scss']
})
export class RoleCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() role: Role;

  @Input()
  permission: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, protected permissionsService: PermissionsService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }

  viewRole(role: Role) {
    this.router.navigate([{outlets: {leftsidebar: ["view", role.id]}}], {relativeTo: this.activatedRoute.parent});
  }

  editPermissions(role: Role) {
    this.router.navigate([{outlets: {leftsidebar: [AUTH_MANAGEMENT_ROUTE_PERMISSIONS, role.id]}}], {relativeTo: this.activatedRoute.parent});
  }

  editCourses(role: Role) {
    this.router.navigate([{outlets: {leftsidebar: [AUTH_MANAGEMENT_ROUTE_COURSES, role.id]}}], {relativeTo: this.activatedRoute.parent});
  }
}
