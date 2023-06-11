import { Component, OnInit } from '@angular/core';
import { LoadingIndicatorService, NotificationService, Role, SidenavService } from "@satipasala/base";
import { ActivatedRoute } from "@angular/router";
import { OrderBy } from "../../../../../../../../libs/base/src/lib/impl/FirebaseDataSource";
import { RolesService } from "../../../../../../../../libs/base/src/lib/services/roles.service";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'satipasala-role-course-page',
  templateUrl: './role-course-page.component.html',
  styleUrls: ['./role-course-page.component.scss']
})
export class RoleCoursePageComponent implements OnInit {
  roleId: string;
  orderBy: OrderBy[];
  currentRole: Role;
  roleCourseForm: FormGroup;
  isFormTouched: boolean = false;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private rolesService: RolesService,
    private notificationService: NotificationService, private sideNavService: SidenavService) {
    this.orderBy = [{ fieldPath: 'name', directionStr: 'asc' }];

    // Subscribe to router to get role id
    activatedRoute.params.subscribe(value => {
      this.roleId = value.roleId;
      this.rolesService.get(this.roleId).subscribe(role => {
        this.currentRole = role;
      },reason => this.notificationService.showErrorNotification(reason));
    });
  }

  ngOnInit() {
    this.roleCourseForm = this.formBuilder.group({
      items: new FormArray([])
    })
  }

  onSubmit(value: any) {
    this.notificationService.startLoadingIndicator();
    this.currentRole.courses = {};
    value.items.forEach((item) => {
      if (item.roleCourseCheckBox) {
        item.course.mandatory = item.roleCourseMandatory;//Update mandatory status
        this.currentRole.courses[item.course.id] = item.course;
      }
    });
    this.rolesService.update(this.roleId, this.currentRole)
      .then(() => {
        this.notificationService.showSuccessNotification('Courses assigned to the role');
        this.back();
      })
      .catch(error => {
        this.notificationService.showErrorNotification('Failed to assign courses', error);
      });
  }

  back() {
    this.sideNavService.close();
  }

  formSubmissionStatus(event) {
    this.isFormTouched = event;
  }

}
