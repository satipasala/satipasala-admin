import {ChangeDetectorRef, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {LocationType, OrganizationType, PermissionsService, RefDataType, ReferenceDataService} from "@satipasala/base";
import {ComponentType} from "@angular/cdk/portal";
import {RefDataTypeComponent} from "../../base";
import {LocationTypeFormComponent} from "./school-type-form/location-type-form.component";

@Component({
  selector: 'admin-school-types',
  templateUrl: './location-types.component.html',
  styleUrls: ['./location-types.component.css']
})
export class LocationTypesComponent extends RefDataTypeComponent<LocationType> {

  constructor(fireStore: AngularFirestore, dialog: MatDialog, referenceDataService: ReferenceDataService,
              public permissionsService: PermissionsService, cdr: ChangeDetectorRef) {
    super(RefDataType.SCHOOL_TYPE, "School Types", fireStore, dialog, referenceDataService, permissionsService, cdr);
  }

  refDataFormMinWidth(): string {
    return "300px";
  }

  createNewObject(): LocationType {
    return new class implements LocationType {
      active: string;
      displayName: string;
      id: string;
      name: string;
      organizationType: OrganizationType;
      type: string;
    }
  }

  getComponentType(): ComponentType<any> {
    return LocationTypeFormComponent;
  }

}
