import {Component, Input, OnInit} from '@angular/core';
import {Event, ObjectUtils, StorageService, User} from '@satipasala/base';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {
  EventSession,
  Subscription,
  USER_NOT_STARTED
} from "../../../../../../../../libs/base/src/lib/model/EventSession";

@Component({
  selector: 'admin-event-facilitator-card',
  templateUrl: './event-facilitator-card.component.html',
  styleUrls: ['./event-facilitator-card.component.scss']
})
export class EventFacilitatorCardComponent implements OnInit {

  @Input()
  mode: string;

  @Input() controlName: string;
  @Input()
  event: Event | EventSession;

  @Input()
  set user(value: User) {
    this._user = value;
    this.form.patchValue({
      user: this._user,
      facilitatorCheckBox: this.isFacilitatorSelected(this._user)
    });
    this.loadUserImage(value);
  }

  get user(): User {
    return this._user;
  }

  private _user: User;
  imageUrl: Observable<string>;

  @Input()
  formGroup: FormGroup;

  form: FormGroup;

  constructor(private storeService: StorageService) {
    this.form = new FormGroup({
      user: new FormControl(),
      facilitatorCheckBox: new FormControl(),
    });

  }

  ngOnInit(): void {
    (this.formGroup.controls[this.controlName] as FormArray).push(this.form);
  }

  isFacilitatorSelected(user: User): boolean {
    return this.event && this.event[this.controlName] && this.event[this.controlName][user.email] != null
  }


  loadUserImage(user: User) {
    this.imageUrl = this.storeService.getUserImagePath(user);
  }

  updateFacilitators(user: User, isSelected: boolean) {
    if (this.event) {
      if (this.event[this.controlName] == null) {
        this.event[this.controlName] = {};
      }
      if (isSelected == true) {
        this.event[this.controlName][user.email] = <Subscription>{status: USER_NOT_STARTED,user:ObjectUtils.extractUserInfo(user) }
      } else {
        delete this.event[this.controlName][user.email]
      }
    }
  }
}
