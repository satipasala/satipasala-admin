import { Component, OnInit } from '@angular/core';
import { Course, CoursesService, SidenavService, NotificationService, LoadingIndicatorService } from "@satipasala/base";
import { ActivatedRoute, Route, Router } from "@angular/router";

@Component({
  selector: 'admin-course-assign-to-user-page',
  templateUrl: './course-assign-to-user-page.component.html',
  styleUrls: ['./course-assign-to-user-page.component.scss']
})
export class CourseAssignToUserPage implements OnInit {
  course: Course;

  constructor(
    private router: Router,
    private route: ActivatedRoute, private coursesService: CoursesService, private sideNavService: SidenavService,
    private notificationService: NotificationService) {

    /*This form receives edit, view, new*/
    this.route.params.subscribe(params => {
      this.coursesService.get(params.courseId).subscribe(course => {
        this.course = course;
      }, err => {
        this.notificationService.showErrorNotification("Error retrieving course", err);
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
