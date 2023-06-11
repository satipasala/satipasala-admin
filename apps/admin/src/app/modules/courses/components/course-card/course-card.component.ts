import { Component, Input, OnInit } from '@angular/core';
import {Course, CoursesService, StorageService} from "@satipasala/base";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'admin-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input()
  course: Course;

  rolePermission: Object;

  @Input()
  set permission(permission: Object) {
    this.rolePermission = permission;
  }

  getImage(){
    return  this.storageService.getDefaultMediaPath(this.course.mediaFiles,"assets/images/v-mindful-walking.png")
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private storageService:StorageService) {
  }

  ngOnInit() {
  }

  editCourse(course: Course) {
    this.router.navigate([{ outlets: { leftsidebar: [course.id, "edit"] } }], { relativeTo: this.activatedRoute.parent });
  }

  showActivities(course: Course) {
    this.router.navigate([{ outlets: { leftsidebar: ["activities", course.id] } }], { relativeTo: this.activatedRoute.parent });
  }

  addStudents(course: Course) {
    this.router.navigate([{ outlets: { leftsidebar: ["course", "assign", course.id] } }], { relativeTo: this.activatedRoute.parent });
  }

  getActivityCount(course: Course):number {
    return Object.keys(course?.activities).length
  }
}
