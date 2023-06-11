import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  NotificationService,
  StorageService,
  User,
  UsersService,
  PermissionsService,
  Permission, AuthService
} from "@satipasala/base";
import {Observable} from "rxjs";
import {ResetPasswordDialog} from './reset-password-dialog/reset-password-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'admin-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  private _user: User;
  imageUrl: Observable<string>;
  organization: String;
  isAuthorizedToEdit: boolean = false;
  isAuthorizedTossignCourses: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private storeService: StorageService,
              public dialog: MatDialog, private usersService: UsersService, public permissionService: PermissionsService,
              private notificationService: NotificationService) {

  }

  @Input()
  set currentUser(value: User) {
    this._currentUser = value.email;
  }

  _currentUser: string = null;

  ngOnInit() {
  }

  @Input()
  set user(value: User) {
    this._user = value;
    this.imageUrl = this.usersService.getPhotoUrl(value);
    if (value.organizationInfo) {
      this.organization = value.organizationInfo.name;
    }
    this.isAuthorizedToEditUser();
  }


  edit() {
    this.router.navigate([{outlets: {leftsidebar: [this.user.email]}}], {relativeTo: this.activatedRoute.parent});
  }

  editCourses(user: User) {
    this.router.navigate([{outlets: {leftsidebar: [this.user.email, "courses"]}}], {relativeTo: this.activatedRoute.parent});
  }

  get user(): User {
    return this._user;
  }

  isAuthorizedToEditUser() {
    this.permissionService.isAuthorizedToEditUsers('edit', this.user, this.user).then(value => {
      this.isAuthorizedToEdit = value;
      if (this._currentUser === this.user.email) {
        this.isAuthorizedTossignCourses = true;
      } else {
        this.isAuthorizedTossignCourses = value;
      }
    }).catch(reason => {
      this.isAuthorizedToEdit = false;
      this.isAuthorizedTossignCourses = false;
    });
  }

  openDialog(userData: User): void {
    const dialogRef = this.dialog.open(ResetPasswordDialog, {
      width: '350px',
      // height: '25%',
      data: {user: userData}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.showSuccessNotification(result.message);
      }
    });
  }
}

