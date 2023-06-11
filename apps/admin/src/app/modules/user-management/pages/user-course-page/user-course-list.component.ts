import { Component, OnInit } from '@angular/core';
import {
  NotificationService,
  SidenavService,
  User,
  UsersService,
  AuthService
} from "@satipasala/base";
import { ActivatedRoute } from "@angular/router";
import { OrderBy } from "../../../../../../../../libs/base/src/lib/impl/FirebaseDataSource";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'satipasala-user-course-page',
  templateUrl: './user-course-list.component.html',
  styleUrls: ['./user-course-list.component.scss']
})
export class UserCourseListComponent implements OnInit {
  userId: string;
  orderBy: OrderBy[];
  selectedUser: User;
  userCourseForm: FormGroup;
  dbUser: User;

  constructor(private formBuilder: FormBuilder, activatedRoute: ActivatedRoute, private usersService: UsersService,
    private notificationService: NotificationService, private sideNavService: SidenavService,
    authService: AuthService) {
    this.orderBy = [{ fieldPath: 'name', directionStr: 'asc' }];
    // Subscribe to router to get user id
    activatedRoute.params.subscribe(value => {
      this.userId = value.uid;
      this.usersService.get(this.userId).subscribe(user => {
        this.selectedUser = user;
      },reason => this.notificationService.showErrorNotification(reason));
    });

    authService.getCurrentDbUser().subscribe(user => {
      this.dbUser = user;
    }, error => console.error(error));
  }

  ngOnInit() {
    this.userCourseForm = this.formBuilder.group({
      items: new FormArray([])
    });
  }

  onSubmit(value: any) {
    this.selectedUser.courseSubscriptions = {};
    value.items.forEach((item: any) => {
      if (item.courseCheckBox) {
        // If the mandatory field is not permitted to mark by users, then it'll return the field as undefined
        item.course.mandatory = (item.mandatoryCourseSlider == undefined) ? item.course.mandatory = false : item.course.mandatory = item.mandatoryCourseSlider;
        this.selectedUser.courseSubscriptions[item.course.id] = item.course;
      }
    });

    this.notificationService.startLoadingIndicator();
    this.usersService.update(this.selectedUser.id, this.selectedUser).then(() => {
      this.notificationService.showSuccessNotification("Course Assignment");
      this.back();
    }).catch(error => {
      console.error(error);
      this.notificationService.showErrorNotification("Course Assignment");
    });
  }

  back() {
    this.sideNavService.close();
  }
}
