import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {Permission, PermissionsService, RefDataType, ReferenceDataService} from '@satipasala/base';
import {RefDataTypeComponent} from "../../../referencedata/components/base";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/portal";

@Component({
  selector: 'admin-permission-info',
  templateUrl: './permission-info.component.html',
  styleUrls: ['./permission-info.component.scss']
})
export class PermissionInfoComponent extends RefDataTypeComponent<Permission> {
  @Output()
  public onSelected: EventEmitter<{ item: Permission, selected: boolean }> = new EventEmitter();

  public selectionEnabled: boolean;

  constructor(fireStore: AngularFirestore, dialog: MatDialog, referenceDataService: ReferenceDataService,
              public permissionsService: PermissionsService, cdr: ChangeDetectorRef) {
    super(RefDataType.PERMISSION, "Collection names", fireStore, dialog, referenceDataService, permissionsService, cdr);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.onSelected.observers.length > 0) {
      this.selectionEnabled = true;
    }
  }

  refDataFormMinWidth(): string {
    return "300px";
  }

  createNewObject(): Permission {
    return new Permission();
  }

  getComponentType(): ComponentType<any> {
    return null;
  }

}
