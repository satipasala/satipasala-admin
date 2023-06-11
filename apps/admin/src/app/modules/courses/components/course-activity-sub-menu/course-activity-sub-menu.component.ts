import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  COURSE_ACTIVITY_INFO_ROUTE,
  COURSE_MANAGEMENT_ROUTE
} from 'apps/admin/src/app/app-routs';

import {Activity} from "@satipasala/base";

@Component({
  selector: 'admin-activity-sub-menu',
  templateUrl: './course-activity-sub-menu.component.html',
  styleUrls: ['./course-activity-sub-menu.component.css']
})
export class CourseActivitySubMenuComponent implements OnInit {

  constructor(private router: Router, private activatedRoute:ActivatedRoute) { }

  @Input() activity : Activity;

  ngOnInit() {
  }

  viewActivity(){
    this.router.navigate([COURSE_MANAGEMENT_ROUTE + '/' + COURSE_ACTIVITY_INFO_ROUTE]);
  }
  viewAllCourses() {

  }
}
