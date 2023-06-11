import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../model/User";

@Component({
  selector: 'link-account-dialog',
  templateUrl: './link-account-dialog.html',
  styleUrls: ['./link-account-dialog.scss']
})
export class LinkAccountDialog implements OnInit {

  userProfileForm: FormGroup;
  user: User;
  submitted = false;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<LinkAccountDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // this.userToResetPassword = data.user;
    this.user = data.user;
  }

  ngOnInit() {
    this.buildForm();
  }

  // convenience getter for easy access to form fields
  get upf() {
    return this.userProfileForm.controls;
  }

  onNoClick(): void {
    this.submitted = false;
    this.userProfileForm.reset();
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;

    if (!this.userProfileForm.valid) {
      return;
    }
    this.dialogRef.close(this.userProfileForm.value['password']);
  }


  buildForm() {
    this.userProfileForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.isPasswordaMatch('password', 'confirmPassword')
    });
  }


  isPasswordaMatch(pw: string, cpw: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[pw];
      const confirmPassword = formGroup.controls[cpw];

      if (confirmPassword.errors && !confirmPassword.errors.isPasswordaMatch) {
        // return if another validator has already found an error on the confirmPassword
        return;
      }

      // set error on confirmPassword if validation fails
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ isPasswordaMatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }

}
