import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  USERS_ROUTE
} from "../../../../app-routs";
import {User} from "@satipasala/base";

@Component({
  selector: 'admin-user-sub-menu',
  templateUrl: './user-sub-menu.component.html',
  styleUrls: ['./user-sub-menu.component.scss']
})
export class UserSubMenuComponent implements OnInit {

  @Input() user: User;

  constructor(private router: Router,private activatedRoute:ActivatedRoute) {
  }

  ngOnInit() {
  }

  edit() {
   // this.router.navigateByUrl(USERS_ROUTE + "/" + this.user.uid);
    this.router.navigate([{outlets: {leftsidebar: [this.user.email]}}], {relativeTo: this.activatedRoute.parent});
  }

  viewCourses() {
   // this.router.navigateByUrl(USERS_ROUTE + "/" + this.user.uid);
    this.router.navigate([{outlets: {leftsidebar: [this.user.email,"courses"]}}], {relativeTo: this.activatedRoute.parent});
  }
}
