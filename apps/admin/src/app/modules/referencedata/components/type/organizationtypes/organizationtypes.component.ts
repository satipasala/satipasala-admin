import {ChangeDetectorRef, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {OrganizationTypeFormComponent,} from "./organization-type-form/organization-type-form.component";
import {OrganizationType, PermissionsService, RefDataType, ReferenceDataService} from "@satipasala/base";
import {ComponentType} from "@angular/cdk/portal";
import {RefDataTypeComponent} from "../../base";

@Component({
  selector: 'admin-organization-types',
  templateUrl: './organizationtypes.component.html',
  styleUrls: ['./organizationtypes.component.scss']
})
export class OrganizationTypesComponent extends RefDataTypeComponent<OrganizationType> {

  constructor(fireStore: AngularFirestore, dialog: MatDialog, referenceDataService: ReferenceDataService,
              public permissionsService: PermissionsService, cdr: ChangeDetectorRef) {
    super(RefDataType.ORGANIZATION_TYPE, "Organization Types", fireStore, dialog, referenceDataService, permissionsService, cdr);
  }

  refDataFormMinWidth(): string {
    return "300px";
  }

  createNewObject(): OrganizationType {
    return new OrganizationType();
  }

  getComponentType(): ComponentType<any> {
    return OrganizationTypeFormComponent;
  }

  generateElementId(organizationName : string){
    return organizationName?.replace(/\s/g, "");
  }

}
