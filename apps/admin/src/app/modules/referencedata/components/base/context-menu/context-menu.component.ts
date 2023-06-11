import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { RefData } from "../../../../../../../../../libs/base/src/lib/model/referencedata/RefData";
import { PermissionsService } from "@satipasala/base";

@Component({
  selector: 'admin-ref-data-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  encapsulation: ViewEncapsulation.None, // disable ViewEncapsulation
})
export class RefDataContextMenuComponent<T extends RefData> implements OnInit {

  @Input()
  refDataObj: T;

  @Output()
  private contextMenuClickEmitter: EventEmitter<RefDataContextMenuItem<T>> = new EventEmitter<RefDataContextMenuItem<T>>();

  canView: boolean;
  canEdit: boolean;

  constructor(private permissionsService: PermissionsService) {
    this.permissionsService.isRoleAuthorized('collection_referencedata').then(permission => {
      this.canView = permission['view'];
      this.canEdit = permission['edit'];
    })
  }

  ngOnInit() {
  }

  view() {
    this.contextMenuClickEmitter.emit(new RefDataContextMenuItem(RefDataContextMenuType.VIEW, this.refDataObj));
  }

  edit() {
    this.contextMenuClickEmitter.emit(new RefDataContextMenuItem(RefDataContextMenuType.EDIT, this.refDataObj));
  }

  delete() {
    this.contextMenuClickEmitter.emit(new RefDataContextMenuItem(RefDataContextMenuType.DELETE, this.refDataObj));
  }

}

/**
 * Reference data context menu object
 *
 */
export class RefDataContextMenuItem<T> {
  public type: RefDataContextMenuType;
  public data: T;

  constructor(type: RefDataContextMenuType, data: T) {
    this.type = type;
    this.data = data;
  }
}

/**
 * Reference data types
 *
 */
export enum RefDataContextMenuType {
  VIEW = "view",
  EDIT = "edit",
  DELETE = "delete"
}
