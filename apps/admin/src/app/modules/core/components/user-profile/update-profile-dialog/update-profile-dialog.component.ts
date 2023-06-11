import {Component, Inject, OnInit} from "@angular/core";
import {User, AuthService, NotificationService} from "@satipasala/base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'update-profile-dialog',
  templateUrl: './update-profile-dialog.html',
  styleUrls: ['./update-profile-dialog.component.scss']
})
export class UpdateProfileDialog implements OnInit {

  userProfileForm: FormGroup;
  userProfileData: User;
  submitted = false;

  constructor(private notificationService: NotificationService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<UpdateProfileDialog>, private auth: AuthService, @Inject(MAT_DIALOG_DATA) public data: any) {

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

    this.updateProfile(this.userProfileForm.value['password']);
  }

  updateProfile(password: string) {
    this.auth.updateFirebaseAuthProfilePassword(password).subscribe(result => {
      this.notificationService.showSuccessNotification("Password update success.");
      this.dialogRef.close(result);
    }, error => {
      this.notificationService.showErrorNotification(error.message);
      this.dialogRef.close(error);
    });
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
        confirmPassword.setErrors({isPasswordaMatch: true});
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }

}
