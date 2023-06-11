import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Input, EventEmitter} from '@angular/core';
import {Permission, Role} from "@satipasala/base";

import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'admin-permission-card',
  templateUrl: './permission-card.component.html',
  styleUrls: ['./permission-card.component.scss']
})
export class PermissionCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() permission:Permission;
  @Input() isPermissionEnabled: any;
  @Input() addRemovePermission: any;
  @Input() selectionEnabled: boolean;
  @Input() onSelected:EventEmitter<{item:Permission,selected:boolean}>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }
}
