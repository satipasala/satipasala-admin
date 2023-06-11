import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Course, CoursesService, SidenavService, NotificationService} from "@satipasala/base";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'admin-course-activity-list',
  templateUrl: './course-activity-list.component.html',
  styleUrls: ['./course-activity-list.component.scss']
})
export class CourseActivityListComponent implements OnInit, OnDestroy {
  course: Course;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private sideNavService: SidenavService,
    private notificationService: NotificationService) {

  }

  ngOnInit() {
    /*This form receives edit, view, new*/
    this.route.params.subscribe(params => {

      if (params.courseId) {
        this.coursesService.get(params.courseId).subscribe(course => {
            this.course = course;
          }, err => {
            this.notificationService.showErrorNotification("Error retrieving course", err);
            setTimeout(() => {
              this.back();
            }, 1000)
          }
        )
      } else {
        // this.backToCourseManage();
      }
    });
  }

  back(){
    this.sideNavService.close();
  }

  ngAfterViewInit(): void {
  }

  loadMore(event: PageEvent) {
  }

  ngOnDestroy(): void {
  }
}
