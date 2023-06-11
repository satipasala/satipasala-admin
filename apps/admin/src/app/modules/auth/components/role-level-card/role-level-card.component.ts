import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {RoleLevel} from "@satipasala/base";


@Component({
  selector: 'admin-role-level-card',
  templateUrl: './role-level-card.component.html',
  styleUrls: ['./role-level-card.component.scss']
})
export class RoleLevelCard implements OnInit, AfterViewInit {
  @Input() roleLevel: RoleLevel;

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }
}
