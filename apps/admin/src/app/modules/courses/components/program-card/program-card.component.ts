import { Component, Input, OnInit } from '@angular/core';
import { Course, CoursesService } from "@satipasala/base";
import { ActivatedRoute, Router } from "@angular/router";
import {Program} from "../../../../../../../../libs/base/src/lib/model/Course";

@Component({
  selector: 'admin-program-card',
  templateUrl: './program-card.component.html',
  styleUrls: ['./program-card.component.scss']
})
export class ProgramCardComponent implements OnInit {

  @Input()
  program: Program;

  rolePermission: Object;

  @Input()
  set permission(permission: Object) {
    this.rolePermission = permission;
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

  editProgram(program: Program) {
    this.router.navigate([{ outlets: { leftsidebar: ["program",program.id, "edit"] } }], { relativeTo: this.activatedRoute.parent });
  }

  showCourses(program: Program) {
    this.router.navigate([{ outlets: { leftsidebar: ["programCourses","info", program.id] } }], { relativeTo: this.activatedRoute.parent });
  }

  addStudents(program: Program) {
    this.router.navigate([{ outlets: { leftsidebar: ["programUsers", "assign", program.id] } }], { relativeTo: this.activatedRoute.parent });
  }

  getCourseCount(program: Program):number {
    return program.courses?Object.keys(program.courses).length:0;
  }
}
