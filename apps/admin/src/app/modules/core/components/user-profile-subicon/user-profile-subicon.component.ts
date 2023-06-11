import {Component, Input, OnInit} from '@angular/core';
import {AuthService, User, UsersService} from "@satipasala/base";
import {Observable} from "rxjs";


@Component({
  selector: 'user-profile-subicon',
  templateUrl: './user-profile-subicon.component.html',
  styleUrls: ['./user-profile-subicon.component.scss'],
})
export class UserProfileSubIconComponent implements OnInit {

  @Input('ngClass')
  public sub_profile;

  user: User;
  imageUrl: Observable<string>;

  constructor(public auth: AuthService, private userService: UsersService) {
  }

  ngOnInit(): void {
    this.auth.getCurrentDbUser().subscribe(dbUser => {
      this.user = dbUser;
      this.imageUrl = this.userService.getPhotoUrl(dbUser); //Load image URL
    });
  }


}

