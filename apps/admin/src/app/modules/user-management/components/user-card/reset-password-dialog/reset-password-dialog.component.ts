import { ChangeDetectorRef, Component, Inject, ViewChild } from "@angular/core";
import { User, AuthService } from "@satipasala/base";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'reset-password-dialog',
  templateUrl: './reset-password-dialog.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})
export class ResetPasswordDialog {

  userToResetPassword: User = null;

  constructor(private auth: AuthService, private cdRef: ChangeDetectorRef, public dialogRef: MatDialogRef<ResetPasswordDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userToResetPassword = data.user;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmPasswordReset() {
    const userData = {email : this.userToResetPassword.email};
    this.auth.resetUserPasswordToDefault(userData,environment.functions.resetUserPasswordUrl).subscribe(result => {
      this.dialogRef.close(result)
    });
  }

}
