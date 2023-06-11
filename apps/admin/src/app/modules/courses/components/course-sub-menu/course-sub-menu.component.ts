import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Course, Host} from "@satipasala/base";
import {AUTH_MANAGEMENT_ROUTE_PERMISSIONS} from "../../../../app-routs";

@Component({
  selector: 'admin-course-sub-menu',
  templateUrl: './course-sub-menu.component.html',
  styleUrls: ['./course-sub-menu.component.css']
})
export class CourseSubMenuComponent implements OnInit {
  @Input() course: Course;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

  editCourse() {
    this.router.navigate( [{outlets: {leftsidebar: [this.course.id ,"edit"]}}],{relativeTo: this.activatedRoute.parent});
  }

  showActivites() {
    this.router.navigate( [{outlets: {leftsidebar: ["activities",this.course.id ]}}],{relativeTo: this.activatedRoute.parent});
  }

  addStudents() {
    this.router.navigate( [{outlets: {leftsidebar: ["course","assign",this.course.id ]}}],{relativeTo: this.activatedRoute.parent});
  }
}
