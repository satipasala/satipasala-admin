import {ChangeDetectorRef, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ActivityTypeFormComponent,} from "./activity-type-form/activity-type-form.component";
import {ActivityType, PermissionsService, RefDataType, ReferenceDataService} from "@satipasala/base";
import {ComponentType} from "@angular/cdk/portal";
import {RefDataTypeComponent} from "../../base";

@Component({
  selector: 'admin-activity-types',
  templateUrl: './activitytypes.component.html',
  styleUrls: ['./activitytypes.component.css']
})
export class ActivityTypesComponent extends RefDataTypeComponent<ActivityType> {

  constructor(fireStore: AngularFirestore, dialog: MatDialog, referenceDataService: ReferenceDataService,
              public permissionsService: PermissionsService, cdr: ChangeDetectorRef) {
    super(RefDataType.ACTIVITY_TYPE, "Activity Types", fireStore, dialog, referenceDataService, permissionsService, cdr);
  }

  refDataFormMinWidth(): string {
    return "500px";
  }

  createNewObject(): ActivityType {
    return new ActivityType();
  }

  getComponentType(): ComponentType<any> {
    return ActivityTypeFormComponent;
  }

}
