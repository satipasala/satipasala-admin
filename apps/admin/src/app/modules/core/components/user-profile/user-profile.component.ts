import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService, NotificationService, User, UsersService} from "@satipasala/base";
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UpdateProfileDialog} from './update-profile-dialog/update-profile-dialog.component';
import {USER_IMAGE_FOLDER} from "../../../../admin-const";
import {Observable} from "rxjs";

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  user: Promise<User>;
  imageUrl: string;

  constructor(public auth: AuthService, public dialog: MatDialog, private notificationService: NotificationService, private userService: UsersService) {
  }

  ngOnInit(): void {

    this.user = new Promise<User>(observer => {
      // Check for profile pic changes if there is no default one is set
      this.auth.getCurrentDbUser().subscribe(dbUser => {
        // Check profile pic changes in every login only if user has not uploaded a profile pic
        this.auth.getCurrentAuthUser().then(userInfo => {
          const currentUrl = dbUser.photoURL;
          if (userInfo && userInfo.photoURL && (currentUrl === null || currentUrl === undefined || currentUrl === ""
            || (!currentUrl.includes(USER_IMAGE_FOLDER) && currentUrl !== userInfo.photoURL))) {
            this.userService.updatePhotoUrl(userInfo.photoURL, dbUser);

          }
          observer(dbUser);

        }).catch(reason => {
          observer(dbUser)
        });
      }, error => reason => {
        console.error(reason)
      });
    });

    this.user.then(dbUser => {
      this.userService.getPhotoUrl(dbUser).subscribe(url => {
        this.imageUrl = url
      }); //Load image URL
    })

  }

  logout() {
    this.auth.signOut();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(UpdateProfileDialog, {
      width: '350px',
      // height: '35%',
      data: {user: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.showSuccessNotification(result.message + " " + result.status);
      }
    }, error => {
      this.notificationService.showErrorNotification("Error", error)
    });
  }

}
