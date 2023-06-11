import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User, Host, StorageService } from '@satipasala/base';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { DEFAULT_USER_IMAGE } from 'apps/admin/src/app/admin-const';
import {url} from "inspector";

@Component({
  selector: 'admin-host-student-card',
  templateUrl: './host-student-card.component.html',
  styleUrls: ['./host-student-card.component.scss']
})
export class HostStudentCardComponent implements OnInit {

  get user(): User {
    return this._user;
  }

  @Input()
  set user(value: User) {
    if (this.selectedClassKey) {
      this._user = value;
      this.studentForm.patchValue({
        user: this._user,
        studentCheckBox: this.isStudentSelected(this._user)
      });
      this.loadUserImage(value);
    }
  }

  objectKeys = Object.keys;
  private _user: User;
  imageUrl: Observable<string>;

  @Input()
  formGroup: FormGroup;

  studentForm: FormGroup;

  @Output() assignedStudent: EventEmitter<User> = new EventEmitter<User>();

  constructor(private storeService: StorageService) {
    this.studentForm = new FormGroup({
      user: new FormControl(),
      studentCheckBox: new FormControl(),
    });
  }

  @Input() selectedClassKey:string;
  // set selectedClassKey(value: string) {
  //   this._selectedClassKey = value;
  // Bug: Since the selectedClassKey is not changed when the filters change on assignment selection(host/class), updated users are not patched to the form
  // if (this._selectedClassKey) {
  //   this.studentForm.patchValue({
  //     user: this.user,
  //     studentCheckBox: this.isStudentSelected(this.user)
  //   });
  // }
  //   if(this.selectedClassKey === this.selectedKey){
  //     console.log('Key is the same')
  //   }else {
  //     this.selectedKey = value;
  //     console.log('New key set')
  //   }
  // console.log(value)
  // }

  // get selectedClassKey(): string {
  //   return this._selectedClassKey;
  // }

  ngOnInit(): void {
    (this.formGroup.controls['items'] as FormArray).push(this.studentForm);
  }

  isStudentSelected(user: User): boolean {
    // if (this.host.locations[this.selectedClassKey] && user.locationInfo && user.organizationInfo) {
    //   if (this.host.locations[this.selectedClassKey].id === user.locationInfo.id
    //     && this.host.locations[this.selectedClassKey].hostId === user.organizationInfo.id) {
    //     return true;

    //   } else {
    //     return false;
    //   }
    // } else {
    //   return false;
    // }

    if (user?.locationInfo?.id === this.selectedClassKey) {
      this.assignedStudent.emit(user);
      return true;
    } else {
      return false;
    }
  }


  loadUserImage(user: User) {
    this.imageUrl = this.storeService.getUserImagePath(user);
  }

}
