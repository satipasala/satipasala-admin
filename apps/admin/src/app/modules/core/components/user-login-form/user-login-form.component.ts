import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "@satipasala/base";
import {LOGIN_IN_PROGRESS_KEY} from "../../../../admin-const";


@Component({
  selector: 'admin-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  loginForm: FormGroup;
  notification: string;
  error: string;
  showIndicator: boolean;

  constructor(private fb: FormBuilder, public authService: AuthService) {
  }

  ngOnInit() {

    // Check for in progress login
    const isLoginInProgress = localStorage.getItem(LOGIN_IN_PROGRESS_KEY);
    if (isLoginInProgress && isLoginInProgress === "true") {
      this.notification = "Login is in progress. Please wait...";
      this.showIndicator = true;
      localStorage.removeItem(LOGIN_IN_PROGRESS_KEY);
    }


    this.authService.proceedWithInProgressLogin().subscribe(loginResult => {
      this.notification = loginResult;
      this.error = "";
    }, error => {
      this.error = error;
      this.notification = "";
      this.showIndicator = false;
      localStorage.removeItem(LOGIN_IN_PROGRESS_KEY);
    });

    // Construct login form
    this.loginForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
    });
  }

  onSubmit() {
    this.notification = "Please wait...";
    this.authService.emailLogin(this.loginForm.value['email'], this.loginForm.value['password']).subscribe(loginResult => {
      this.notification = loginResult;
      this.error = "";
    }, error => {
      this.error = error;
      this.notification = "";
    });
  }

  signInWithOAuthLogin(provider) {
    this.authService.oAuthLogin(provider).subscribe(loginResult => {
      this.notification = loginResult;
      this.error = "";
    }, error => {
      this.error = error;
      this.notification = "";
      localStorage.removeItem(LOGIN_IN_PROGRESS_KEY);
    });
  }
}
