import {Component, Input, OnInit} from '@angular/core';
import {Course, CoursesService} from "@satipasala/base";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'auth-course-card',
  templateUrl: './auth-course-card.component.html',
  styleUrls: ['./auth-course-card.component.scss']
})
export class AuthCourseCardComponent implements OnInit {

  @Input()
  course: Course;

  constructor(private router: Router, private  activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

  showActivites(course: Course) {
    this.router.navigate([{outlets: {leftsidebar: ["activities", course.id]}}], {relativeTo: this.activatedRoute.parent});
  }

  getNumberOfActivities(course : Course){
    return Object.keys(course.activities).length
  }

}
