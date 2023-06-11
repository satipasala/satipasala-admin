import { Component, OnInit } from '@angular/core';
import {LocalDataSource, Role} from "@satipasala/base";
import { ActivatedRoute, Router } from "@angular/router";
import { PermissionsService, RolesService } from "@satipasala/base";

@Component({
  selector: 'admin-role-view-card',
  templateUrl: './role-view-card.component.html',
  styleUrls: ['./role-view-card.component.scss']
})
export class RoleViewCardComponent implements OnInit {

  roleId: string;
  role = <Role>{};

  coursesDataSource: LocalDataSource;


  constructor(protected router: Router, protected route: ActivatedRoute,
    protected rolesService: RolesService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.roleId) {
        this.roleId = params.roleId;
        this.rolesService.get(this.roleId).subscribe(roleDoc => {
          this.role = roleDoc;
          this.coursesDataSource =  new LocalDataSource(Object.values(this.role.courses));
        },reason => console.log(reason))
      } else {
        // TODO:
      }
    });
  }
}
