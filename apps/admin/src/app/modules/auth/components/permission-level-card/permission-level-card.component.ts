import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {PermissionLevel} from "@satipasala/base";


@Component({
  selector: 'admin-permission-level-card',
  templateUrl: './permission-level-card.component.html',
  styleUrls: ['./permission-level-card.component.scss']
})
export class PermissionLevelCard implements OnInit, AfterViewInit {
  @Input() permissionLevel: PermissionLevel;


  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }
}
