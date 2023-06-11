import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ChangeDetectorRef} from '@angular/core';
import {OrderBy} from 'libs/base/src/lib/impl/FirebaseDataSource';
import {
  City,
  LocalDataSource,
  PermissionLevel, PermissionsService,
  QuestionLabel,
  RefDataType,
  ReferenceDataService,
  SearchFilter
} from '@satipasala/base';
import {RefDataTypeComponent} from "../../../referencedata/components/base";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/portal";

@Component({
  selector: 'admin-permission-level',
  templateUrl: './permission-level-page.component.html',
  styleUrls: ['./permission-level-page.component.scss']
})
export class PermissionLevelPage extends RefDataTypeComponent<PermissionLevel> {


  constructor(fireStore: AngularFirestore, dialog: MatDialog, referenceDataService: ReferenceDataService,
              public permissionsService: PermissionsService, cdr: ChangeDetectorRef) {
    super(RefDataType.PERMISSION_LEVEL, "Permission Levels", fireStore, dialog, referenceDataService, permissionsService, cdr);
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
