import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "@satipasala/base";

@Component({
  selector: 'admin-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.scss']
})
export class UserLoginPageComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.auth.isUserLoggedIn().then(loggedIn => {
      if(loggedIn){
        this.router.navigate(['/']);
      }
    });
  }

}
