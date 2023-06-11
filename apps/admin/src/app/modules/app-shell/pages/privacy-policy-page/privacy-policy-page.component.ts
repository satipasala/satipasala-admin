import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "@satipasala/base";

@Component({
  selector: 'admin-privacy-policy',
  templateUrl: './privacy-policy-page.component.html',
  styleUrls: ['./privacy-policy-page.component.scss']
})
export class PrivacyPolicyPageComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) {
  }

  ngOnInit() {

  }

}
