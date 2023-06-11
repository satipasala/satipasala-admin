import {ChangeDetectorRef, Component} from '@angular/core';
import {PermissionLevel, PermissionsService, RefDataType, ReferenceDataService} from '@satipasala/base';
import {RefDataTypeComponent} from "../../../referencedata/components/base";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/portal";

@Component({
  selector: 'admin-role-level',
  templateUrl: './role-level-page.component.html',
  styleUrls: ['./role-level-page.component.scss']
})
export class RoleLevelPage extends RefDataTypeComponent<PermissionLevel> {
  permission: { vPermission: boolean, ePermission: Boolean } = {vPermission: false, ePermission: false};

  constructor(fireStore: AngularFirestore, dialog: MatDialog, referenceDataService: ReferenceDataService,
              private permissionService: PermissionsService, cdr: ChangeDetectorRef) {
    super(RefDataType.ROLE_LEVEL, "Role Levels", fireStore, dialog, referenceDataService, permissionService, cdr);
  }

  refDataFormMinWidth(): string {
    return "300px";
  }

  createNewObject(): PermissionLevel {
    return new PermissionLevel();
  }

  getComponentType(): ComponentType<any> {
    return null;
  }

}
