import { Component, Input, OnInit } from '@angular/core';
import { User, UsersService } from "@satipasala/base";
import { Observable } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'admin-event-user-card',
  templateUrl: './event-user-card.component.html',
  styleUrls: ['./event-user-card.component.scss']
})
export class EventUserCardComponent implements OnInit {

  private _user: User;
  imageUrl: Observable<string>;
  organization: String;

  constructor(public dialog: MatDialog, private usersService: UsersService) {
  }

  @Input()
  set currentUser(value: any) {
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
  }

  get user(): User {
    return this._user;
  }



}

